# Excel release and acceptance

The validated workbook baseline has six visible review pages, including Executive Dashboard, and 23 hidden supporting sheets. It retains the three native Power Query connections, two native PivotTables and the audited 2015-2025 snapshot. The 2026 additional evaluation is separate. The six-page presentation layer consolidates historical and variance analysis, seasonality, forecast performance, planning decisions and source quality without deleting underlying evidence. The published [Excel workbook](../excel/NZ_Dairy_Planning_Intelligence.xlsx) is a subsequent user-uploaded copy; the validation below relates to the inspected baseline.

## Refresh and source control

1. Save a backup before changes. Keep the original source files accessible and the evaluated Monthly Data snapshot intact.
2. Select Data > Refresh All in Microsoft Excel. Confirm the three queries complete without source or gateway errors. If files move, update literal source paths using the [three-query setup](../powerquery/queries/README.md).
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

## Desktop evidence received on 25 November 2026

The workbook opened successfully in Microsoft Excel, as reported during acceptance testing. The saved workbook and exported PDF were inspected without modifying the original. The saved file retains all 6,000 formula-cell locations (Excel reorganised shared formulas), three query connections, three query tables, two native PivotTables and eight charts. No cached formula errors were found. All 1,320 values in the ten-column monthly query output match the audited snapshot within the documented tolerances. The four historical source and query sheets retain their prior saved cell values.

| Acceptance item | Evidence status |
|---|---|
| Open repaired workbook | Passed, user reported |
| Save from Excel | Passed, returned workbook inspected |
| Linked 2024 selection | Passed, both review pages show 2024; milk 1,923.86 M kg, exports 1,343.21 M kg; YoY +2.09% and +0.60% |
| Chart rendering | Passed for visible charts in PDF; saved trend chart caches reflect 2024 and prior year |
| Source reconciliation | Passed, 132 months and 1,320 matching cells |
| Print layout | Passed, six A3 landscape PDF pages with no split tables |
| Fresh Refresh All completion | Not independently confirmed; unchanged output alone cannot prove refresh succeeded |
| Native PivotTable filter interaction | Not confirmed; two native objects retained |
| Reopen returned saved copy | Not confirmed |

The public summary graphic is a separate analytical illustration. The full desktop PDF remains local. The uploaded workbook's embedded milk-source redistribution permission has not been independently confirmed.

The Executive Dashboard is the opening presentation page. All six visible sheets have A3 landscape print areas fitted to one page each; the returned PDF confirms this layout. The analysis remains tied to the audited snapshot; source revisions require revalidation. See [calculation reference](excel_calculations.md) and [additional planning review](planning_review.md).

The workbook is available in the repository; see the [data reuse note](../data/README.md) for source permissions. All eleven original Stats NZ annual export CSVs are published in [data/raw/](../data/raw/) and verified against the source package. See [source terms and manifest](../data/README.md).
