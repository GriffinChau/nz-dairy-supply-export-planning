# Forecast evaluation and planning recommendation

## Decision

Retain the same month last year as the starting point for the monthly WMP export outlook. Earlier national milk supply did not improve forecast accuracy consistently in the models tested. Keep supply monitoring separate from export forecast overrides; investigate material deviations using shipment timing, product mix and market context where reliable information is available.

## Test results

Forecast error (WAPE, lower is better):

| Horizon | Months | Seasonal baseline | Export only | Supply informed |
|---|---:|---:|---:|---:|
| 1 month | 24 | 12.42% | 12.68% | 13.41% |
| 2 months | 23 | 12.15% | 11.85% | 12.50% |
| 3 months | 22 | 10.63% | 10.66% | 11.78% |

The seasonal baseline had the lowest validation WAPE at each horizon and was selected before evaluating test results. The export-only model did slightly better at the two-month test horizon. Adding earlier milk supply increased error versus the otherwise comparable export-only model by 0.74, 0.65 and 1.12 percentage points at the three horizons, respectively. This is a descriptive comparison, not a statistical significance or causal claim.

For the one-month-ahead test, seasonal milk supply WAPE was 3.16% (latest-available-month baseline 47.02%); seasonal export WAPE was 12.42% (latest-available-month baseline 30.66%). All figures use revised public historical observations.

## Transparent method

Monthly target and predictor values are from the audited 132-month dataset. For a target month t and forecast horizon h, the forecast origin is t minus h months. The latest available actual is assumed to be t minus h minus one month. Use the same timing convention across models. The one-month release delay is an assumption, not verified publication history.

- Seasonal baseline: export volume in the same month of the previous year.
- Export-only regression: predict the target year-on-year export growth using an intercept and the year-on-year export growth for the latest available month.
- Supply-informed regression: the identical export regression plus the year-on-year milk supply growth for that latest available month.
- Forecast volume: last year's same-month export volume multiplied by one plus predicted growth, with a floor of zero.
- Fit ordinary least squares separately for each horizon. Fit validation models on available observations through November 2021, and refit using observations through November 2023 for the final test. The training targets begin after sufficient 12-month lag history and the horizon-specific release delay. Coefficients are fixed within each evaluation period.
- Validation targets: January 2022 to December 2023 for one month, February 2022 to December 2023 for two months, March 2022 to December 2023 for three months. Test targets are January, February or March 2024 respectively through December 2025. In each case the earliest origin is December of the preceding year; the count is 24, 23 or 22. Comparisons within each horizon use identical targets.
- WAPE = sum of absolute forecast errors divided by sum of actuals. MAE = mean absolute error in million kg. Bias = sum of forecast minus actual divided by sum of actuals. Positive bias means overforecasting.

The workbook retains model coefficients, monthly formulas linked to audited source observations, and formula-based evaluation results. Coefficients were estimated with ordinary least squares using Python/NumPy; Excel applies the fixed coefficients, not a live regression refit.

## Workbook and quality checks

The forecast evaluation was introduced in the local version 04 workbook. It contains the existing seven sheets and three new sheets: Forecast Review, Forecast Detail, Model Inputs. Start Here presents context, decision and limitations. All populated worksheet regions use Arial; chart text and series colours were restyled. Two native PivotTable parts are retained. Workbook ZIP integrity and formula error scan passed; desktop PivotTable refresh remains to be verified. Native Power Query connections have since been saved in the local version 08 workbook. Local data and workbook are not published pending source reuse permission.

## Planning application and limitations

The Planning Exceptions worksheet applies the fixed 39.08 million kg historical validation threshold to 2024-2025. February 2024 is flagged (actual 138.60 million kg; forecast 85.76 million kg). Investigate shipment timing and market context before overrides. This is not an approved business tolerance or a confidence interval. No manufacturer-level inventory, demand, supply shortage, causal relationship or operational benefit is supported by these national series. The 2024-2025 descriptive patterns were already visible in earlier work; this was a held-out model evaluation, not a fully blinded experiment. See [desktop Excel acceptance](excel_acceptance.md) for the current workbook and release checks.
