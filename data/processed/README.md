# Processed data

[WMP export data](wmp_exports_cleaned.csv) contains the 132 validated monthly export records used by the WMPExports query. It is the analysis-ready representation of the [source-field extract](../public/wmp_exports_2015_2025.csv), with ISO month-start dates, standardised column names and integer quantities in kg. The selected product code is HS10 0402210019; import it as text. Domestic plus re-export quantity equals total export quantity in every row. All records have KGM units and Final status.

Source: Stats NZ, CC BY 4.0. Quantities are unchanged. See [data sources and reuse](../README.md).

The milk supply and joined monthly dataset are generated locally by the [Power Query templates](../../powerquery/queries/README.md). They are not supplied as separate CSV downloads; see the [workbook and source-use note](../../excel/README.md) for embedded data. The fixed analysis dataset is the reconciled Monthly Data snapshot in the workbook, not an automatically overwritten live table.
