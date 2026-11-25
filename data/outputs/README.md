# Analytical outputs

These CSVs expose the calculated results used in the planning review. They are not additional model inputs.

| File | Rows | Workbook source | Purpose |
|---|---:|---|---|
| [forecast_evaluation.csv](forecast_evaluation.csv) | 18 | Forecast Review A15:G32 | Validation and test comparison of three WMP models across three horizons |
| [forecast_performance_2026.csv](forecast_performance_2026.csv) | 7 | 2026 Performance Check, export columns | Actual and unchanged seasonal forecast, January-July 2026 |
| [planning_exceptions.csv](planning_exceptions.csv) | 24 | Planning Exceptions A9:F32 | One-month seasonal deviation screening, 2024-2025 |

WAPE and signed bias in the evaluation file are percentage values (12.42 means 12.42%, not 0.1242); MAE is in million kg. Metrics are rounded to six decimal places from the saved workbook. In the 2026 file quantities and errors are in kg; signed error is forecast minus actual. In the exceptions file, signed deviation is actual minus forecast, and the fixed threshold is 39,079,193 kg. These opposite sign conventions are explicit in the column names. February 2024 is the only flagged test month.

The 2026 file includes only Stats NZ domestic WMP actuals and the seasonal export forecast. Missing milk actuals and row-level milk inputs are not published. The 2026 original monthly source filenames identify the additional source files; they are not part of the eleven annual historical CSVs.

Source: Stats NZ, CC BY 4.0, and calculated case study results. The supply-informed metrics are aggregate analytical results, not redistributed milk records. All evaluations are retrospective. See [forecast methodology](../../docs/forecast_evaluation.md) and [planning review](../../docs/planning_review.md).
