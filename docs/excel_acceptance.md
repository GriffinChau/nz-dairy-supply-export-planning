# Desktop Excel release and dashboard setup

The current compact candidate is local version 10, derived from version 09 and the user-saved version 08 workbook with three native Power Query connections: MilkSupply, WMPExports and MonthlyPlanning. The three queries successfully previewed on Excel for Mac and the saved workbook contains 132 rows in each output. The 1,320 cells of MonthlyPlanning matched Monthly Data within numeric tolerance. Version 10 has 24 sheets (eight visible review sheets and 16 hidden support sheets), two native PivotTables and the existing Year Review dropdown. Standalone instruction tabs have been removed; the [calculation reference](excel_calculations.md) and this guide serve as technical documentation. Use Unhide to access MonthlyPlanning, Refresh Control, Seasonality and Annual Review when verifying refresh and pivots. See [additional planning review](planning_review.md) for the four new sheets and the source-match gate. The complete workbook remains local pending source reuse rights.

## 1. Preserve the working connections

Save a local copy of the master workbook before changing it. Do not delete Monthly Data or overwrite the evaluated snapshot. Avoid third-party XLSX round-trips that can strip the Power Query mashup.

Use Data > Refresh All. Wait for all queries to finish. The native connections have been loaded and saved, but a full post-save refresh is not independently verified. On Mac, the original multi-source script initially returned a gateway error; separate MilkSupply and WMPExports queries with explicit source paths and a third merge query succeeded. If files move, update the literal paths in the source queries using Advanced Editor. See [three-query reproduction templates](../powerquery/mac/README.md).

## 2. Create the dashboard using native Excel features (after analytical acceptance)

Office Scripts did not load in the user's Excel for Mac session. It is not required for this project. The manual route is the current release procedure; the experimental script is retained for reference only, not a verified deliverable.

Only after the analytical workbook passes acceptance, on a backup copy of the saved master workbook, duplicate Year Review (Move or Copy > Create a copy), rename the copy Executive Dashboard and move it to the first tab. Preserve the original sheet. The existing B5 year selector and four KPI formulas already work from the audited Monthly Data snapshot. Confirm that changing B5 between 2024 and 2025 updates the copied sheet.

- Milk supply chart: select A13:C25 on Executive Dashboard and use Insert > Line > 2-D Line. The two series are current-year and prior-year milk supply. Move the chart to the right of the existing review table.
- Export chart: select A13:A25, then hold Command and select E13:F25. Insert a 2-D Line chart. Confirm the horizontal axis shows Jan-Dec and there are two series, not the YoY percentage or status columns. Move this chart below the first.
- Use Arial, navy headings, teal current-year series and slate prior-year series. Label each chart in million kg, keeping milk solids and powder distinct. Hide gridlines and check readability.
- Add a source-match formula in a blank row below the review, comparing refreshed MonthlyPlanning A2:H133 against audited Monthly Data A2:H133. Check 132 rows, unique dates via the validated query, matching dimensions, exact export quantities and milk tolerance of 0.001 kg. This is a comparison, not an automatic overwrite. Use the following formula in A34 (after verifying the cell is empty):

```excel
=IFERROR(IF(AND(COUNTA(MonthlyPlanning!A:A)=133,COUNT(MonthlyPlanning!A2:A133)=132,COUNT(MonthlyPlanning!E2:H133)=528,SUMPRODUCT(--(MonthlyPlanning!A2:D133<>'Monthly Data'!A2:D133))=0,SUMPRODUCT(--(ABS(MonthlyPlanning!E2:E133-'Monthly Data'!E2:E133)>0.001))=0,SUMPRODUCT(--(MonthlyPlanning!F2:H133<>'Monthly Data'!F2:H133))=0),"SOURCE MATCH","REVIEW REQUIRED"),"REVIEW REQUIRED")
```

The formula is prepared from the verified workbook structure; the desktop result still needs testing. A match means the query output agrees with the snapshot, not proof that the last refresh succeeded. Confirm refresh status separately. Do not overwrite the snapshot if a check fails.

These dashboard charts are ordinary formula-driven charts, not native PivotCharts. The dashboard build and formatting remain to be checked on desktop Excel. No automation add-in, macro or Office Scripts dependency is required.

## 3. Native interactivity

Select the existing Seasonality PivotTable and use PivotTable Analyze > Insert Slicer, then choose Year. Place the slicer beside the pivot, not over data. Select the pivot and insert a chart if the Excel version supports a native PivotChart. Use average monthly milk supply and average monthly domestic WMP exports as separate series with clearly identified units, and keep month order Jan-Dec. Do not combine or subtract the physical quantities. Refresh and test the slicer; verify the corresponding chart responds. Repeat with Annual Review only if a slicer adds value. The dashboard's dropdown is separate from any pivot slicer. Do not describe ordinary charts as PivotCharts.

## 4. Release checks

| Test | Expected outcome |
|---|---|
| Open and save master copy | No repair warning; three native queries retained |
| Data > Refresh All | Three query outputs refresh without gateway or source errors |
| Query output | 132 months, 10 columns in MonthlyPlanning |
| Refresh Control E4 | SOURCE MATCH when the snapshot matches; REVIEW REQUIRED on difference |
| Change year to 2024, then 2025 | 2025 milk 1,975.74 million kg and domestic WMP 1,304.78 million kg; changes +2.70% and -2.86% |
| Both existing PivotTables | Refresh with correct annual and monthly totals |
| Slicer / PivotChart | Changes filter selection and chart as intended if supported |
| Forecast review | 1-month seasonal WAPE 12.42% for exports in fixed 2024-2025 test |
| Visual inspection | Arial, no cropped titles, legible chart axes and no unintended colours |
| Save and reopen | Query definitions and all interactive features retained |

If the source match check fails, do not copy new values over the snapshot. Investigate the source change, repeat quality checks, refit the model coefficients and rerun validation/test if appropriate. Update source documentation and preserve the prior version.

The full workbook must not be publicly uploaded until the milk-source reuse terms are confirmed. The original Stats NZ files can be published with attribution; use the manifest and existing raw-data upload instructions. No user-specific file paths are published here.
