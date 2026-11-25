# NZ Dairy Supply & Export Planning Intelligence

**An Excel-based business analysis case study | New Zealand dairy sector | 2015-2025**

## Executive summary

New Zealand's dairy sector has pronounced seasonal milk collection patterns, but milk supply and export shipments do not necessarily move together. A planning team needs a dependable starting forecast, a clear way to monitor changes and a practical process for investigating significant deviations.

This independent case study turns publicly reported monthly milk collection and domestic whole milk powder (WMP) export statistics into an auditable Excel planning review. It tests whether earlier milk supply adds value to a forecast of export shipments, rather than assuming that more milk automatically means more exports.

| Coverage | Source review | Forecast test | Decision |
|:---|---:|:---|:---|
| **132 matched months** | **735,118 export rows screened** | **2024-2025 held-out period** | **Retain seasonal baseline** |

| 2025 performance | 2024 | 2025 | Change |
|:---|---:|---:|---:|
| Milk supply (million kg milk solids) | 1,923.86 | 1,975.74 | **+2.70%** |
| Selected domestic WMP exports (million kg powder) | 1,343.21 | 1,304.78 | **-2.86%** |

**Decision:** use last year's same-month volume as the reference export forecast. Monitor supply separately and investigate material shipment deviations before overriding the forecast.

![Planning findings summary - domestic WMP export variance and forecast accuracy](assets/planning-findings.svg)

*Public summary graphic of the analytical results, not a screenshot of the Excel workbook.*

## 1. Business problem and scope

**Question:** Can available milk supply observations improve a one- to three-month outlook for New Zealand domestic WMP exports compared with using export history alone?

The intended users are planning, supply chain and operations analysts reviewing monthly sector-level volumes. The goal is better-informed investigation, not a claim of business savings or a manufacturer-level inventory plan.

| Hypothesis | Test | Outcome |
|---|---|---|
| H1: Seasonality improves the forecast | Seasonal baseline vs latest-available-month forecast | Supported in the one-month held-out comparison |
| H2: Earlier milk supply improves WMP forecasting | Comparable export-only and supply-informed models, 1-3 months | Not supported in these tests |

## 2. Key insights

### 01 | Seasonal supply and export patterns are different

Milk collection peaks in October (average 260.68 million kg milk solids) and reaches its low in June (18.75 million kg), with the peak approximately 13.9 times the low. The selected domestic WMP export series peaks in December and reaches its low in August. The two-month difference between average peaks is descriptive, not a demonstrated production-to-shipment lag.

![Monthly WMP export seasonality](assets/wmp-seasonality.svg)

**Implication:** a single month-to-month planning rule can miss recurring seasonal shifts. Use separate seasonal profiles for raw milk collection and finished-product shipments.

### 02 | More milk does not necessarily mean more export shipments

In 2025, milk supply rose by 2.70% while selected domestic WMP exports fell by 2.86%. Four months had opposite year-on-year directions: March, April, May and November. May and November were the largest monthly export declines in absolute volume compared with the corresponding 2024 months.

| Month | Milk supply YoY | Domestic WMP exports YoY | Export volume change |
|---|---:|---:|---:|
| May 2025 | +7.43% | -22.21% | -27.86 million kg |
| November 2025 | +2.69% | -15.52% | -24.27 million kg |

**Implication:** national milk collections alone do not explain how product mix, shipment timing, customer demand or stock movements influence export volume. Those are investigation topics, not established causes.

### 03 | A simpler seasonal forecast is a strong starting point

One-month-ahead test error (WAPE, lower is better):

| Series | Latest available month | Same month last year |
|---|---:|---:|
| Milk supply | 47.02% | **3.16%** |
| Domestic WMP exports | 30.66% | **12.42%** |

Adding lagged milk supply to an otherwise comparable export-history model increased held-out export forecast error at every horizon.

![Forecast model comparison](assets/forecast-comparison.svg)

| Horizon | Test months | Seasonal | Export only | Supply informed |
|---|---:|---:|---:|---:|
| 1 month | 24 | **12.42%** | 12.68% | 13.41% |
| 2 months | 23 | 12.15% | **11.85%** | 12.50% |
| 3 months | 22 | **10.63%** | 10.66% | 11.78% |

The seasonal baseline was selected using 2022-2023 validation, before scoring the test period. The export-only model was slightly better at the two-month test horizon. These results do not establish statistical significance or causation. WAPE is total absolute forecast error divided by total actual volume.

### 04 | Make exceptions actionable, not automatic overrides

A proposed review threshold of **39.08 million kg** was derived from the fifth-largest absolute seasonal forecast error in the 24-month validation period. Applying that fixed threshold to 2024-2025 flags one month.

| Review item | February 2024 |
|---|---:|
| Forecast | 85.76 million kg |
| Actual domestic exports | 138.60 million kg |
| Actual minus forecast | **+52.84 million kg** |
| Review threshold | 39.08 million kg |
| Action | Investigate shipment deviation |

The threshold is an analyst-proposed screening rule, not a confidence interval or approved business tolerance.

### 05 | Prioritise the months behind the annual variance

The 2025 net export decline of 38.43 million kg reflects gross decreases of 77.72 million kg, partly offset by 39.29 million kg of increases. May and November account for **67.08% of gross monthly decreases**. Prioritise those months for investigation; do not confuse gross contribution with share of the net annual change.

The complete 2024/25 dairy season also shows divergence: milk supply rose 2.97% compared with 2023/24, while selected domestic WMP exports fell 6.81%. The June-May view complements the calendar-year review.

### 06 | Check performance beyond the original test period

| Additional retrospective check | Actual months | WAPE | Signed bias |
|---|---:|---:|---:|
| Milk supply, Jan-May 2026 | 5 | 5.92% | -5.92% |
| Domestic WMP exports, Jan-Jul 2026 | 7 | 13.02% | -10.13% |

The unchanged seasonal baseline underforecast both series over these partial-year periods. Monitor bias and investigate sustained deviations rather than automatically overriding the forecast. No 2026 observations were used to select or fit the original baseline. See [additional planning review](docs/planning_review.md).

## 3. Recommendations and monthly review process

| Recommended action | Proposed owner | Timing | Evidence to review |
|---|---|---|---|
| Use same-month-last-year as the export baseline | Planning analyst | Monthly | WAPE, MAE and signed bias |
| Keep milk supply and export shipment views separate | Supply chain analyst | Monthly | Seasonal profiles and YoY movements |
| Investigate unusually large shipment deviations before overriding the baseline | Planning and export operations | When threshold is exceeded | Dispatch timing, shipment schedules and reliable market context |
| Check source revisions before adopting refreshed analysis | Analyst responsible for reporting | Every refresh | 132-month reconciliation; refit coefficients if the historical snapshot changes |
| Review the exception threshold with stakeholders | Planning lead | Before operational adoption | Historical false alerts and missed material events |

These are proposed actions for a planning review, not implemented company changes or verified financial benefits.

## 4. Data foundation and quality

| Source | Scope | Treatment |
|---|---|---|
| [DCANZ / NZX / DairyNZ](https://dcanz.com/resources/) | Monthly national milk solids collected for processing | Convert thousand kg to kg; retain 2015-2025 |
| [Stats NZ overseas merchandise trade](https://www.stats.govt.nz/large-datasets/csv-files-for-download/overseas-merchandise-trade-datasets/) | 11 annual national HS10 exports files | Filter HS10 0402210019; use domestic exports, KGM, Final |
| Joined monthly dataset | 132 months | Merge on month-start date; check duplicates, coverage and quantities |

No synthetic inputs. All selected export records reconcile domestic exports plus re-exports to total exports. The milk source and complete joined workbook remain local pending confirmation of reuse rights. The [original Stats NZ export datasets](data/raw/) contain all 11 unchanged annual national HS10 CSVs (735,118 records, 2015-2025). All 11 Git blob identifiers and file sizes were checked against the original source package. The [public Stats NZ extract](data/public/wmp_exports_2015_2025.csv) contains the 132 selected records; the [source manifest](data/raw_source_manifest.csv) records row counts, byte sizes and SHA-256 checksums. See [data reuse](data/README.md).

### Data lineage and analytical outputs

| Stage | Published file or location | Role |
|---|---|---|
| Original exports | [11 annual CSVs](data/raw/) | Unchanged source records |
| Filtered source extract | [132 selected records](data/public/wmp_exports_2015_2025.csv) | Original field names and quantities |
| Cleaned exports | [Analysis-ready monthly exports](data/processed/wmp_exports_cleaned.csv) | Standardised dates, fields and units |
| Joined monthly dataset | [Power Query templates](powerquery/queries/) | Local milk and export merge; full dataset retained locally |
| Model evaluation | [Forecast metrics](data/outputs/forecast_evaluation.csv) | 18 aggregate validation and test results |
| Additional evaluation | [2026 export performance](data/outputs/forecast_performance_2026.csv) | Seven observed export months |
| Exception review | [Planning exceptions](data/outputs/planning_exceptions.csv) | 24 test months, fixed threshold |

[Output definitions](data/outputs/README.md) explain units, error signs and source lineage. The workbook uses the reconciled historical snapshot rather than automatically overwriting evaluated data.

## 5. Excel solution

| Component | Function | Evidence |
|---|---|---|
| Power Query | Import, filter, append 11 CSVs, merge two sources | Three native queries saved in the local workbook after successful source and merge checks in Microsoft Excel |
| Data lineage | Original, staging, processed and reconciliation views | 132 matched months; 1,320 joined output cells matched the audited snapshot within tolerance |
| Excel Tables and PivotTables | Annual totals and calendar-month seasonality | Two native PivotTables; desktop refresh acceptance still pending |
| Year Review | Dropdown-driven annual and monthly comparison | SUMIFS, IFERROR, conditional formatting |
| Forecast Review | Model comparison, WAPE, MAE, bias and coefficients | Excel formulas applying fixed regression coefficients estimated with NumPy |
| Planning Exceptions and Outlook | Evidence-based review threshold and three-month retrospective outlook | Explicit thresholds and forecast origin |
| Refresh Control | Compare refreshed query output against the evaluated snapshot | 132/132 rows match; mismatch test passed |
| Dairy Season and Variance Review | June-May heatmaps and monthly contribution analysis | Complete seasons only; year selection 2016-2025 |
| 2026 Performance Check | Additional frozen-baseline evaluation | Partial-year WAPE and bias, no model tuning |
| Consolidated review pages | Linked review metrics, variance chart and 2026 actual-versus-forecast chart | Five analytical pages with a shared year selection from the executive overview |
| Executive Dashboard | Shared year selector, annual KPIs, two monthly trend charts, forecast evidence and recommended actions | Implemented; desktop year selection and chart rendering verified from the saved workbook and PDF |

**Refresh design:** original files -> MilkSupply and WMPExports -> MonthlyPlanning -> source match check -> audited Monthly Data snapshot -> analysis and recommendations. A changed snapshot requires reviewing model coefficients and rerunning evaluation. It must not silently overwrite the evaluated historical data.

The intended [final workbook location](excel/README.md) is `excel/NZ_Dairy_Planning_Intelligence.xlsx`. The workbook is retained locally pending permission to redistribute the embedded milk data.

### Workbook navigation

The local workbook presents six visible review tabs. Executive Dashboard provides the shared year selector, annual KPIs, separate milk and WMP trend charts, fixed-period forecast evidence and recommended actions. Historical Performance combines annual metrics and monthly variance; Dairy Season Review presents separate seasonal heatmaps; Forecast Performance combines held-out model results and the additional 2026 check, including actual versus forecast exports; Planning Review prioritises the material exception and the dated outlook; Data & Quality shows source coverage and reconciliation. The detailed calculations, source tables, native queries and PivotTables remain in the same workbook as hidden supporting sheets. Each visible sheet has an explicit landscape print area. Technical notes are maintained in the repository.

## 6. Reproduce and inspect the work

- [Data preparation](docs/data_preparation.md) - source selection, transformation and quality checks.
- [Excel analysis](docs/excel_review.md) - initial validation and Excel methods.
- [Forecast evaluation](docs/forecast_evaluation.md) - training, validation, test design and model limitations.
- [Excel calculation reference](docs/excel_calculations.md) - key formula locations, methods and interpretation.
- [Desktop Excel acceptance and dashboard setup](docs/excel_acceptance.md) - native connection evidence, dashboard build and release checks.
- [Native Power Query setup](powerquery/queries/README.md) - three-query templates for importing, validating and merging the source data.

The public repository contains documentation, charts, code, all 11 original annual Stats NZ export CSVs and the attributed 132-row export extract. The milk workbook and complete joined workbook remain local pending confirmation of reuse rights. Download the milk source independently using the documented source link. This is an independent portfolio case study, not a commissioned client project.

## 7. Limitations

- Exports are realised shipments, not unconstrained demand or customer orders. Milk solids and WMP have different physical meanings and cannot be subtracted to calculate an inventory gap.
- HS10 0402210019 is a narrowly defined WMP category, not all dairy exports.
- Forecasts use revised historical statistics and an assumed one-month publication delay. Historical release vintages were unavailable; the test is retrospective, not a fully blinded real-time experiment.
- The test covers a limited number of months. Different forecast horizons have different target counts.
- No operational savings, causal relationships, stockouts, manufacturing capacity or forecast adoption are claimed.

## 8. Release status

Core analysis and the executive presentation are implemented in local version 12 (six visible review tabs, 23 hidden support tabs). Three native queries and two native PivotTables are preserved. The workbook was opened and saved in Microsoft Excel with 2024 selected. The saved workbook and six-page A3 landscape PDF confirm linked year selection, chart rendering, source reconciliation and print layout. The saved file contains 6,000 formula cells, no cached formula errors, three native query connections, two native PivotTables and eight charts. Completion of a fresh Refresh All operation, PivotTable filter interaction and a further reopen of the saved copy remain unconfirmed. The [public findings graphic](assets/planning-findings.svg) is available for review. The full workbook and its PDF remain local pending milk-source reuse permission. All 11 original Stats NZ annual export CSVs are published and verified against the source package. No additional source connections are needed.
