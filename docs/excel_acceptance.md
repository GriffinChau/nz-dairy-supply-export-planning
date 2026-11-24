# Excel data lineage and acceptance review

## Business purpose

Trace each monthly figure to its source before using forecasts in planning. The analysis uses 132 matched months from January 2015 to December 2025.

## Data locations

- data/raw/: eleven unmodified national export CSVs and the independently downloaded milk workbook. Public repository allows only the eleven named Stats NZ CSVs. The milk workbook remains local.
- data/staging/: separate filtered milk and WMP records. Local only.
- data/processed/: monthly joined dataset and quality checks. Local only.
- data/public/: attributed Stats NZ export extract, 132 rows.
- excel/06_nz_dairy_excel_lineage.xlsx: local analysis workbook.
- powerquery/MonthlyPlanning.m: separate Power Query preparation script.

See data/README.md and data/raw_source_manifest.csv. Extract the supplied Stats NZ raw upload ZIP, copy only its data/raw CSVs to the cloned repository and use GitHub Desktop to commit and push. Compare filenames, file sizes and SHA256 values to the manifest. Do not upload the local milk workbook, joined dataset or analysis workbook pending permission. The full original annual CSVs are not yet present on the remote.

## New workbook sheets

- Milk Source Extract: 132 selected source observations in thousand kg; Excel converts to kg.
- Export Source Extract: 132 selected original monthly WMP records, quantities in kg.
- Data Lineage: source locations, transformation stages, record counts and publication boundary.
- Source Reconciliation: month-by-month comparison of milk, domestic exports, re-exports and total exports against Monthly Data. All 132 rows pass, with a 0.001 kg tolerance for milk and exact equality for export quantities.
- Planning Outlook: retrospective January-March 2026 illustration with forecast origin 31 December 2025. Same month last year is the chosen baseline. Milk outlook 211.85, 171.16 and 173.99 million kg; WMP outlook 144.59, 124.45 and 120.92 million kg. These are forecasts from observed 2025 values, not synthetic input data or a current forecast. No 2026 actuals used to construct or evaluate this illustration.

Existing 2,891 formulas preserved exactly; 930 additional formulas. Two pivot definitions, two pivot cache pairs and three chart parts retained. Workbook archive integrity, source reconciliation, formula error scan and lineage preview checked. Desktop Excel behaviour remains an acceptance task.

## Desktop Excel acceptance checklist

1. Open the local workbook. Check that Excel does not display a repair warning.
2. Verify all 132 Source Reconciliation rows show Pass. Inspect a month manually against the original source CSV and milk file.
3. In Power Query, create a blank query and paste MonthlyPlanning.m. Set RawFolder to the directory containing the original source files. Load to a new worksheet and check the 132 rows and annual totals.
4. Follow docs/excel_review.md to update Monthly Data A2:H133, preserving the I:J formulas, then refresh the native PivotTables. Confirm the Year filter, totals and average monthly values. Keep the fixed analysis window; changes to the date range require reviewing formula ranges and evaluation dates.
5. Inspect formulas and notes in Forecast Review, Forecast Detail and Planning Exceptions. Verify the three-month retrospective outlook against the same months of 2025.
6. Review typography, readability, charts and filters in desktop Excel. Only add native slicers or PivotCharts if they support a useful analysis.
7. Approve Excel before proceeding to Power BI.

The Power Query script has not been embedded in the workbook, and the Power Query engine and native PivotTable refresh have not been executed in this environment. Do not treat those steps as verified.
