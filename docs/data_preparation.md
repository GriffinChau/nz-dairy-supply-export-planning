# Data preparation and validation

## Source files

Use the original NZ-Milk-Production-202606-May-Table.xlsx, sheet Monthly, and the 11 annual national Exports_HS10 CSV files for 2015-2025. Extract the CSVs from their annual ZIP files. Keep originals in data/raw/; do not use imports, by-country exports or 2026 monthly releases in the initial evaluation window. The 2026 milk workbook contains 276 months (June 2003 to May 2026). The overlap used is January 2015 to December 2025.

Source links: https://dcanz.com/resources/ and https://www.stats.govt.nz/large-datasets/csv-files-for-download/overseas-merchandise-trade-datasets/.

## Power Query reproduction

1. Import the Monthly sheet from the milk workbook. Skip the first blank row and promote the next row to headers. Set Month to Date; set Milksolids ('000 kg) to decimal. Keep the milk solids column, multiply by 1,000 to express kg, and filter January 2015 through December 2025. Normalise dates to month start.
2. Extract only the annual national export CSVs into a separate folder. In Excel Power Query, import and combine from that folder (or append the individual CSV queries if folder import is unavailable). Keep hs as text to preserve its leading zero. Filter to 0402210019 and KGM. Retain month, Export_Qty, Re_export_Qty, total_export_qty and status. Convert YYYYMM to a month-start date. Do not silently fill missing quantities with zero.
3. Check that each month has exactly one selected export row, all 132 rows are Final and all quantities reconcile: Export_Qty + Re_export_Qty = total_export_qty. Use Export_Qty for domestic exports. Exclude re-exports from the main analysis.
4. Merge the two queries on month-start dates. Check that all 132 months match, no duplicates or missing records exist, and all quantities are positive except permitted zero re-exports. Add calendar year, month number and dairy season (June to May). Load the result to an Excel Table.
5. Insert a native PivotTable from the table. Use Month Number or Month as rows and average Milk Solids kg / average Domestic WMP Exports kg as values. Use separate charts or axes for the two measures, as their physical meaning differs. For annual review, use Year as rows and Sum of each quantity as values. Add a year slicer if supported. The supplied workbook uses formulas, not native PivotTables or live Power Query connections; those must be created in Excel and verified.

## Product selection

HS10 0402210019: whole milk powder, concentrated, no added sugar or other sweetening matter, fat content exceeding 1.5% by weight, not elsewhere classified in 0402.21. This narrowly defined code accounts for 98.36% of domestic export weight across the eight observed 040221 and 040229 codes, 2015-2025. It is not all WMP. Exclude infant/invalid preparations, blended full cream powder, other milk/cream powders and sweetened variants for a consistent main series. The code review CSV preserves all eight descriptions, quantities and decisions. Do not add by-country data to national totals.

## Actual checks

- 735,118 annual national export source rows reviewed; 132 selected rows, 12 each year.
- 132 unique matched months; positive milk solids and domestic exports; nonnegative re-exports; exact domestic plus re-export reconciliation; all selected export rows Final and KGM.
- 2023 original milk total 1,884,443.849 thousand kg. This reconciles to within 1 thousand kg of the previously published annual total; prior mixed-vintage transcription is superseded. 2025 milk data revised from prior PDF extract.
- 2024 milk solids 1,923,863,790.94 kg; 2025 1,975,737,058.2382 kg (+2.70%). 2024 domestic WMP 1,343,211,160 kg; 2025 1,304,784,051 kg (-2.86%). Average peaks October for milk solids and December for WMP exports.

## Limitations and next step

The initial analysis uses the latest supplied historical revisions, not archived values known at each forecast date. Account for publication delays in validation and disclose the retrospective nature of the evaluation. Do not equate milk solids with WMP output or observed exports with customer demand. Test forecast value using training and validation periods before evaluating an untouched test period. No causal or operational shortage claims.
