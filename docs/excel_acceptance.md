# Desktop Excel release and dashboard setup

The current master is the user-saved version 08 workbook with three native Power Query connections: MilkSupply, WMPExports and MonthlyPlanning. The three queries successfully previewed on Excel for Mac and the saved workbook contains 132 rows in each output. The 1,320 cells of MonthlyPlanning matched Monthly Data within numeric tolerance. The workbook has 22 sheets, two native PivotTables and an existing Year Review dropdown. The complete workbook remains local pending source reuse rights.

## 1. Preserve the working connections

Save a local copy of the master workbook before changing it. Do not delete Monthly Data or overwrite the evaluated snapshot. Avoid third-party XLSX round-trips that can strip the Power Query mashup.

Use Data > Refresh All. Wait for all queries to finish. The native connections have been loaded and saved, but a full post-save refresh is not independently verified. On Mac, the original multi-source script initially returned a gateway error; separate MilkSupply and WMPExports queries with explicit source paths and a third merge query succeeded. If files move, update the literal paths in the source queries using Advanced Editor. See [three-query reproduction templates](../powerquery/mac/README.md).

## 2. Create the dashboard in Excel

If Automate > New Script is available in your Microsoft 365 installation, open it, replace the default script with [BuildExecutiveDashboard.ts](../excel/BuildExecutiveDashboard.ts), and run on the backup copy. Office Scripts availability depends on the licence and settings. The script is prepared, not yet executed in desktop Excel. It creates an Executive Dashboard tab, review-year dropdown, four KPI cards, two ordinary formula-driven line charts, model comparison table and source-match warning. It formats the three loaded query sheets in Arial. It does not change raw data, coefficients, Power Query definitions or the existing two PivotTables.

If Automate is unavailable, retain Year Review and use Insert > Chart to create line charts from its monthly current/prior-year values. Set chart placement and colours manually. A dashboard year selection should update the KPI and monthly charts together. Use the same font and numeric formatting across the new charts.

## 3. Native interactivity

Select the existing Seasonality PivotTable and use PivotTable Analyze > Insert Slicer, then choose Year. Place the slicer beside the pivot, not over data. Select the pivot and insert a chart if the Excel version supports a native PivotChart. Use average monthly milk supply and average monthly domestic WMP exports as separate series with clearly identified units, and keep month order Jan-Dec. Do not combine or subtract the physical quantities. Refresh and test the slicer; verify the corresponding chart responds. Repeat with Annual Review only if a slicer adds value. The dashboard's dropdown is separate from any pivot slicer. Do not describe ordinary charts as PivotCharts.

## 4. Release checks

| Test | Expected outcome |
|---|---|
| Open and save master copy | No repair warning; three native queries retained |
| Data > Refresh All | Three query outputs refresh without gateway or source errors |
| Query output | 132 months, 10 columns in MonthlyPlanning |
| Dashboard source match | SOURCE MATCH when the snapshot matches; REVIEW REQUIRED on difference |
| Change year to 2024, then 2025 | 2025 milk 1,975.74 million kg and domestic WMP 1,304.78 million kg; changes +2.70% and -2.86% |
| Both existing PivotTables | Refresh with correct annual and monthly totals |
| Slicer / PivotChart | Changes filter selection and chart as intended if supported |
| Forecast review | 1-month seasonal WAPE 12.42% for exports in fixed 2024-2025 test |
| Visual inspection | Arial, no cropped titles, legible chart axes and no unintended colours |
| Save and reopen | Query definitions and all interactive features retained |

If the source match check fails, do not copy new values over the snapshot. Investigate the source change, repeat quality checks, refit the model coefficients and rerun validation/test if appropriate. Update source documentation and preserve the prior version.

The full workbook must not be publicly uploaded until the milk-source reuse terms are confirmed. The original Stats NZ files can be published with attribution; use the manifest and existing raw-data upload instructions. No user-specific file paths are published here.
