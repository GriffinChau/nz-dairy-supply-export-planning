let
    Milk = Table.SelectColumns(MilkSupply, {"Month","Milk Solids kg"}),
    Exports = Table.SelectColumns(WMPExports, {"Month","Domestic WMP Exports kg","Re-exports kg","Total WMP Exports kg"}),
    ValidMilk = Table.RowCount(Milk) = 132 and List.Count(List.Distinct(Milk[Month])) = 132 and Table.RowCount(Table.SelectRows(Milk, each [Milk Solids kg] = null or [Milk Solids kg] <= 0)) = 0,
    ValidExports = Table.RowCount(Exports) = 132 and List.Count(List.Distinct(Exports[Month])) = 132,
    Merged = if ValidMilk and ValidExports then Table.NestedJoin(Milk, {"Month"}, Exports, {"Month"}, "ExportData", JoinKind.Inner) else error "Source validation failed.",
    Expanded = Table.ExpandTableColumn(Merged, "ExportData", {"Domestic WMP Exports kg","Re-exports kg","Total WMP Exports kg"}),
    Validated = if Table.RowCount(Expanded) = 132 then Expanded else error "Monthly reconciliation failed.",
    AddYear = Table.AddColumn(Validated, "Year", each Date.Year([Month]), Int64.Type),
    AddMonth = Table.AddColumn(AddYear, "Month Number", each Date.Month([Month]), Int64.Type),
    AddSeason = Table.AddColumn(AddMonth, "Dairy Season", each let y = if [Month Number] >= 6 then [Year] else [Year] - 1 in Number.ToText(y) & "/" & Text.End(Number.ToText(y + 1), 2), type text),
    AddMilkMillion = Table.AddColumn(AddSeason, "Milk Supply (million kg)", each [Milk Solids kg] / 1000000, type number),
    AddExportMillion = Table.AddColumn(AddMilkMillion, "WMP Exports (million kg)", each [Domestic WMP Exports kg] / 1000000, type number),
    Ordered = Table.ReorderColumns(AddExportMillion, {"Month","Year","Month Number","Dairy Season","Milk Solids kg","Domestic WMP Exports kg","Re-exports kg","Total WMP Exports kg","Milk Supply (million kg)","WMP Exports (million kg)"}),
    Output = Table.Sort(Ordered, {{"Month", Order.Ascending}})
in
    Output
