# Excel calculation reference

The calculations below refer to the local audited workbook. This reference documents the analysis rather than reproducing the workbook's source data.

| Location | Method | Purpose |
|---|---|---|
| Milk Source Extract C2 | Original thousand kg multiplied by 1,000 | Standardise milk units |
| Monthly Data I2 | Milk solids kg divided by 1,000,000 | Express volumes in million kg |
| Historical Overview B8:B18, F8:F18 | SUMIFS on audited Monthly Data by year | Full historical annual milk and WMP volumes, 2015-2025 |
| Historical Overview D9:D18, H9:H18, J9:J18 | Current/prior - 1; current minus prior export volume | Annual YoY growth and volume variance; 2015 has no prior year |
| Historical Performance B14 | SUMIFS by year and month number | Retrieve the selected January milk volume |
| Historical Performance D14 | Current month / prior-year month - 1 | Measure year-on-year change; check data completeness before interpreting zero from IFERROR |
| Supply and Exports I8 | CORREL on aligned historical growth series | Explore lagged association on training observations, not causation |
| Forecast Detail L5 | ABS(forecast - actual) | Absolute forecast error |
| Forecast Review C6 | SUM(absolute errors) / SUM(actual volumes) | WAPE for the fixed test period |
| Forecast Review G15 | SUM(signed errors) / SUM(actual volumes) | Signed bias; positive means overforecasting |
| Planning Exceptions B4 | LARGE(validation absolute errors, 5) | Proposed review threshold, not a statistical interval |
| Source Reconciliation F2 | IF, AND and ABS | Check aligned months and source quantities |
| Forecast Detail K5 | MAX(0, seasonal baseline times one plus fitted growth) | Apply fixed regression coefficients estimated with NumPy |
| Historical Performance H14 | Current-year minus prior-year export volume | Monthly contribution to annual change |
| Historical Performance J29 | Sum of two largest gross declines / total gross declines | Prioritise investigation, not share of net change |
| Forecast Performance B15:C16 | Sum of absolute monthly errors / sum of actual volume | One-month naive and seasonal test error, with explicit monthly helper calculations |
| Data & Quality A7 | Link to Refresh Control E4 | Source agreement, not proof of fresh refresh |

The visible review sheets use the audited 2015-2025 snapshot. The additional 2026 check is separate. For the model timing, target windows and coefficient methodology, see [forecast evaluation](forecast_evaluation.md). For source paths and refresh safeguards, see [desktop Excel acceptance](excel_acceptance.md).
