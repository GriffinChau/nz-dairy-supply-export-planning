let
    Source = Excel.Workbook(File.Contents("/path/to/data/raw/NZ-Milk-Production-202606-May-Table.xlsx"), null, true),
    Monthly = Source{[Item="Monthly", Kind="Sheet"]}[Data],
    SkipRows = Table.Skip(Monthly, 1),
    Headers = Table.PromoteHeaders(SkipRows, [PromoteAllScalars=true]),
    Selected = Table.SelectColumns(Headers, {"Month", "Milksolids ('000 kg)"}),
    Typed = Table.TransformColumnTypes(Selected, {{"Month", type date}, {"Milksolids ('000 kg)", type number}}),
    Filtered = Table.SelectRows(Typed, each [Month] >= #date(2015, 1, 1) and [Month] <= #date(2025, 12, 31)),
    MilkKg = Table.AddColumn(Filtered, "Milk Solids kg", each [#"Milksolids ('000 kg)"] * 1000, type number),
    Output = Table.Sort(MilkKg, {{"Month", Order.Ascending}})
in
    Output
