let
    // Historical single-query reference. Set the full source folder path, including its trailing separator.
    RawFolder = "/path/to/data/raw/",
    StartMonth = #date(2015, 1, 1),
    EndMonth = #date(2025, 12, 1),
    ProductCode = "0402210019",
    ExpectedMonths = 132,

    // Milk supply: convert the published thousand kg to kg.
    MilkBook = Excel.Workbook(File.Contents(RawFolder & "NZ-Milk-Production-202606-May-Table.xlsx"), null, true),
    MilkSheet = MilkBook{[Item="Monthly", Kind="Sheet"]}[Data],
    MilkHeaders = Table.PromoteHeaders(Table.Skip(MilkSheet, 1), [PromoteAllScalars=true]),
    MilkColumns = Table.SelectColumns(MilkHeaders, {"Month", "Milksolids ('000 kg)"}),
    MilkTyped = Table.TransformColumns(MilkColumns, {{"Month", each Date.StartOfMonth(Date.From(_)), type date}, {"Milksolids ('000 kg)", each Number.From(_), type number}}),
    MilkWindow = Table.SelectRows(MilkTyped, each [Month] >= StartMonth and [Month] <= EndMonth),
    MilkKg = Table.AddColumn(MilkWindow, "Milk Solids kg", each [#"Milksolids ('000 kg)"] * 1000, type number),
    Milk = Table.SelectColumns(MilkKg, {"Month", "Milk Solids kg"}),

    // Trade: load only national yearly exports, preserving the leading zero in HS10.
    ReadYear = (Year as number) as table =>
        let
            FileName = Number.ToText(Year) & "_Exports_HS10.csv",
            Csv = Csv.Document(File.Contents(RawFolder & FileName), [Delimiter=",", Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
            Headers = Table.PromoteHeaders(Csv, [PromoteAllScalars=true]),
            Selected = Table.SelectRows(Headers, each [hs] = ProductCode),
            Columns = Table.SelectColumns(Selected, {"month", "uom", "status", "Export_Qty", "Re_export_Qty", "total_export_qty"}),
            Typed = Table.TransformColumnTypes(Columns, {{"Export_Qty", Int64.Type}, {"Re_export_Qty", Int64.Type}, {"total_export_qty", Int64.Type}}, "en-NZ"),
            DateAdded = Table.AddColumn(Typed, "Month", each #date(Number.FromText(Text.Start([month], 4)), Number.FromText(Text.End([month], 2)), 1), type date)
        in
            DateAdded,
    TradeAll = Table.Combine(List.Transform({2015..2025}, each ReadYear(_))),
    TradeWindow = Table.SelectRows(TradeAll, each [Month] >= StartMonth and [Month] <= EndMonth),
    TradeBad = Table.SelectRows(TradeWindow, each [uom] <> "KGM" or [status] <> "Final" or [Export_Qty] = null or [Re_export_Qty] = null or [total_export_qty] = null or [Export_Qty] <= 0 or [Re_export_Qty] < 0 or [Export_Qty] + [Re_export_Qty] <> [total_export_qty]),
    TradeNamed = Table.RenameColumns(TradeWindow, {{"Export_Qty", "Domestic WMP Exports kg"}, {"Re_export_Qty", "Re-exports kg"}, {"total_export_qty", "Total WMP Exports kg"}}),
    Trade = Table.SelectColumns(TradeNamed, {"Month", "Domestic WMP Exports kg", "Re-exports kg", "Total WMP Exports kg"}),

    // Fail rather than silently merge incomplete, duplicate or invalid records.
    Valid = Table.RowCount(Milk) = ExpectedMonths and List.Count(List.Distinct(Milk[Month])) = ExpectedMonths and Table.RowCount(Trade) = ExpectedMonths and List.Count(List.Distinct(Trade[Month])) = ExpectedMonths and Table.RowCount(TradeBad) = 0 and Table.RowCount(Table.SelectRows(Milk, each [Milk Solids kg] = null or [Milk Solids kg] <= 0)) = 0,
    Joined = if Valid then Table.NestedJoin(Milk, {"Month"}, Trade, {"Month"}, "Trade", JoinKind.Inner) else error "Source data failed validation. Check source files and monthly coverage.",
    Expanded = Table.ExpandTableColumn(Joined, "Trade", {"Domestic WMP Exports kg", "Re-exports kg", "Total WMP Exports kg"}),
    Matched = if Table.RowCount(Expanded) = ExpectedMonths then Expanded else error "Monthly join did not match all 132 months.",
    AddYear = Table.AddColumn(Matched, "Year", each Date.Year([Month]), Int64.Type),
    AddMonth = Table.AddColumn(AddYear, "Month Number", each Date.Month([Month]), Int64.Type),
    AddSeason = Table.AddColumn(AddMonth, "Dairy Season", each let y = if [Month Number] >= 6 then [Year] else [Year] - 1 in Number.ToText(y) & "/" & Text.End(Number.ToText(y + 1), 2), type text),
    AddMilkMillion = Table.AddColumn(AddSeason, "Milk Supply (million kg)", each [Milk Solids kg] / 1000000, type number),
    AddExportMillion = Table.AddColumn(AddMilkMillion, "WMP Exports (million kg)", each [Domestic WMP Exports kg] / 1000000, type number),
    Ordered = Table.ReorderColumns(AddExportMillion, {"Month", "Year", "Month Number", "Dairy Season", "Milk Solids kg", "Domestic WMP Exports kg", "Re-exports kg", "Total WMP Exports kg", "Milk Supply (million kg)", "WMP Exports (million kg)"}),
    Output = Table.Sort(Ordered, {{"Month", Order.Ascending}})
in
    Output
