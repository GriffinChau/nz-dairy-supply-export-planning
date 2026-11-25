# Excel calculation reference

The calculations below refer to the local audited workbook. This reference documents the analysis rather than reproducing the workbook's source data.

| Location | Method | Purpose |
|---|---|---|
| Milk Source Extract C2 | Original thousand kg multiplied by 1,000 | Standardise milk units |
| Monthly Data I2 | Milk solids kg divided by 1,000,000 | Express volumes in million kg |
| Year Review B14 | SUMIFS by year and month number | Retrieve the selected January milk volume |
| Year Review D14 | Current month / prior-year month - 1 | Measure year-on-year change; check data completeness before interpreting zero from IFERROR |
| Supply and Exports I8 | CORREL on aligned historical growth series | Explore lagged association on training observations, not causation |
| Forecast Detail L5 | ABS(forecast - actual) | Absolute forecast error |
| Forecast Review C6 | SUM(absolute errors) / SUM(actual volumes) | WAPE for the fixed test period |
| Forecast Review G15 | SUM(signed errors) / SUM(actual volumes) | Signed bias; positive means overforecasting |
| Planning Exceptions B4 | LARGE(validation absolute errors, 5) | Proposed review threshold, not a statistical interval |
| Source Reconciliation F2 | IF, AND and ABS | Check aligned months and source quantities |
| Forecast Detail K5 | MAX(0, seasonal baseline times one plus fitted growth) | Apply fixed regression coefficients estimated with NumPy |

The visible review sheets use the audited 2015-2025 snapshot. The additional 2026 check is separate. For the model timing, target windows and coefficient methodology, see [forecast evaluation](forecast_evaluation.md). For source paths and refresh safeguards, see [desktop Excel acceptance](excel_acceptance.md).
