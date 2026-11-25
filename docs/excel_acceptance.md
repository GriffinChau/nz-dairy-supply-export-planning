# Excel release and acceptance

The local version 12 workbook has six visible review pages, including Executive Dashboard, and 23 hidden supporting sheets. It retains the three native Power Query connections, two native PivotTables and the audited 2015-2025 snapshot. The 2026 additional evaluation is separate. The six-page presentation layer consolidates historical and variance analysis, seasonality, forecast performance, planning decisions and source quality without deleting underlying evidence. The workbook remains local pending source reuse permissions.

## Refresh and source control

1. Save a backup before changes. Keep the original source files accessible and the evaluated Monthly Data snapshot intact.
2. Select Data > Refresh All in Microsoft Excel. Confirm the three queries complete without source or gateway errors. If files move, update literal source paths using the [three-query setup](../powerquery/mac/README.md).
3. Open Data & Quality. Confirm 132 matched query months, 132 expected months and SOURCE MATCH. This indicates agreement with the audited snapshot, not proof of a successful recent refresh. Check refresh completion separately.
4. If the output differs, investigate revisions, repeat quality checks and re-evaluate the fixed forecast models as appropriate before adopting changes. Never silently overwrite the evaluated dataset.
5. Supporting sheets are available through Excel's Unhide command. Refresh Control contains the detailed row-by-row match checks. MonthlyPlanning contains the loaded query result; Monthly Data is the audited analysis input.

## Review pages

| Page | Main interaction or evidence |
|---|---|
| Executive Dashboard | B5 year selector (2016-2025); annual KPIs, two volume charts, fixed-period forecast evidence and recommendations |
| Historical Performance | Year linked to Executive Dashboard B5; annual volumes, YoY changes, monthly contribution, two largest decreases and linked variance chart |
| Dairy Season Review | June-May heatmaps; complete seasons only for full-season comparisons |
| Forecast Performance | Held-out model WAPE by horizon, one-month milk and export baseline comparison, partial-year 2026 actuals, signed bias and actual-versus-forecast chart |
| Planning Review | Three-month retrospective outlook and priority exception; the other 23 monitored months are retained in hidden rows |
| Data & Quality | Source coverage and snapshot agreement, linked to the detailed controls |

All six pages use existing evidence and formula links. The dashboard and review charts are ordinary Excel charts with linked data, not PivotCharts. No new Get Data or Power Query setup is required when the existing source paths remain valid. Native PivotTables are preserved in Seasonality and Annual Review, available through Unhide. A native slicer or PivotChart may be added only if the relevant desktop version supports it and it improves the planning workflow. Do not describe an untested feature as implemented. No macros or Office Scripts dependency.

## Acceptance tests

| Test | Expected result |
|---|---|
| Open workbook | No repair message; three saved query definitions and both PivotTables retained |
| Refresh All | No connection error; MonthlyPlanning contains 132 rows and 10 columns |
| Data & Quality A7, E7, I7 | SOURCE MATCH, 132, 132 |
| Executive Dashboard B5 = 2025 | Milk 1,975.74 M kg, WMP 1,304.78 M kg; +2.70%, -2.86% YoY |
| Executive Dashboard B5 = 2024 | Milk 1,923.86 M kg, WMP 1,343.21 M kg; chart and monthly comparisons change |
| 2025 variance | Net -38.43 M kg; gross decreases 77.72 M kg; top two share 67.08% |
| Forecast Performance | One-month seasonal WAPE 3.16% milk and 12.42% WMP; 2026 WAPE 5.92% and 13.02% |
| Planning Review | 39.08 M kg threshold; one flagged month, February 2024 |
| Native PivotTables | Refresh with correct totals and test filters after unhiding supporting sheets |
| Visual inspection | Legible chart axes and labels; no cropping; consistent formatting |
| Save, close, reopen | Queries, formula links, charts and dropdown retained |

The version 12 file passed package integrity, formula-cache and relationship checks. Dashboard calculations for 2024 and 2025 were tested in the calculation environment. Three native query connections and both PivotTables are preserved, together with all 5,943 prior formulas. The new charts have populated caches and internal data links. Desktop Excel open, refresh, linked selector behaviour, chart rendering, filter interaction and save/reopen remain release acceptance tasks.

The Executive Dashboard is the opening presentation page. All six visible sheets have A3 landscape print areas fitted to one page each; verify the result in Print Preview. The analysis remains tied to the audited snapshot; source revisions require revalidation. See [calculation reference](excel_calculations.md) and [additional planning review](planning_review.md).

The complete workbook is not public until milk-source reuse terms are confirmed. Stats NZ exports may be shared with attribution; see [source terms and manifest](../data/README.md).
