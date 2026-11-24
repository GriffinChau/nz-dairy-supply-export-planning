# Excel analysis and validation review

## What the analysis shows

Milk collection and WMP export shipments both vary by month. The training-period relationship between year-on-year changes is weak, even when earlier milk collections are considered. A seasonal forecast is therefore a sensible baseline, rather than assuming that higher milk supply automatically translates into higher exports.

The one-month-ahead validation results for January 2022 to December 2023 are:

| Series | Forecast | WAPE | MAE (million kg) | Bias |
|---|---|---:|---:|---:|
| Milk supply | Latest available month | 47.60% | 73.98 | -0.18% |
| Milk supply | Same month last year | 2.95% | 4.59 | 0.73% |
| WMP exports | Latest available month | 37.53% | 41.15 | 2.52% |
| WMP exports | Same month last year | 24.37% | 26.73 | 9.87% |

WAPE expresses total absolute forecast error as a share of actual volume. MAE is average absolute error. Positive bias means forecasts are too high on average. The seasonal export forecast is better than the simple baseline in validation, but its positive bias and sizeable errors warrant caution. Neither model establishes that earlier milk supply improves export predictions.

## Workbook

The local file `excel/03_dairy_excel_analysis.xlsx` contains a 132-row monthly source table, two native PivotTables (average by calendar month and sum by year), ordinary charts, data quality checks, year-on-year comparisons, and formula-based forecast validation. Use the Year report filter on Seasonality. The PivotTables contain pivot definitions and caches; desktop Excel interaction and refresh have not been tested here. The charts are ordinary charts, not native PivotCharts; no slicer is included. The workbook remains local until source reuse rights are confirmed.

## Power Query setup in Excel

1. Extract the eleven annual national export CSVs and place them alongside the original milk workbook in a local folder. Keep the names unchanged.
2. In Excel, open Data > Get Data > From Other Sources > Blank Query (menu labels vary by Excel version). Open Advanced Editor and paste `powerquery/MonthlyPlanning.m`. Set RawFolder to your actual folder path, using the path syntax for your operating system.
3. Name the query MonthlyPlanningQuery. Load to a new worksheet as an Excel Table. Check 132 rows, January 2015 to December 2025, and compare the 2024/2025 totals with the Annual Review sheet.
4. To update the supplied fixed-window workbook after verifying the query, copy the eight source columns A:H from the query table as values over the existing Monthly Data rows A2:H133, retaining the I:J formulas. Refresh All and verify both PivotTables. If the period or source dimensions change, redesign the fixed formula ranges and the Seasonality pivot source first. Do not append new rows without revising the evaluation split.

The M script is supplied separately, not embedded as an active connection. It has been checked against source headers but not run in the Excel Power Query engine. The first refresh is an acceptance check, not a completed step.

## Method and next step

Use year-on-year changes to reduce shared seasonality, then compare correlation on the same 69 months (April 2016 to December 2021) for supply leads of zero, one, two and three months. Correlations are approximately -0.002, 0.002, 0.089 and 0.225. These are exploratory and do not prove predictive value or causation.

For baseline forecasts, each target month in 2022-2023 is forecast at the previous month-end, conservatively assuming the latest available monthly actual is two months before the target. The seasonal forecast uses the same month of the previous year. The historical data are revised values; release vintages are not available, so this is retrospective validation, not a real-time operational backtest.

Next, compare a simple seasonal export-only model with an otherwise identical model incorporating earlier milk supply. Add two- and three-month horizons. Keep 2024-2025 out of model selection. Only after fixing the model and decision thresholds should final performance be evaluated on those test months. The annual and seasonal descriptive summaries do include 2024-2025, so the test period has not been fully blinded; no forecast scores from it were calculated in this milestone.
