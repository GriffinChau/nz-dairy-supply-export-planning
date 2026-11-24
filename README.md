# NZ Dairy Supply & Export Planning Intelligence

## Business context

New Zealand milk collections vary substantially throughout the year. This independent case study examines whether changes in milk supply help anticipate domestic whole milk powder (WMP) export volumes.

## Initial findings

The data foundation covers January 2015 to December 2025, with 132 matched monthly observations from DCANZ and Stats NZ. Milk supply typically peaks in October; the selected export series peaks in December on average. In 2025, milk supply increased 2.70% while domestic exports of the selected WMP category fell 2.86% compared with 2024.

These observations warrant further investigation. They do not establish a causal relationship or an inventory imbalance.

## Business question

Can seasonal milk supply patterns improve a three-month export outlook compared with forecasting from historical exports alone?

## Approach

- Establish a reliable monthly dataset using published statistics.
- Explore seasonality and compare simple forecast methods.
- Test whether available earlier milk supply observations add predictive value.
- Translate validated results into planning review priorities.

Excel and Power Query are the primary working tools. Power BI will present the findings. Basic Python is optional for forecast validation.

## Data and scope

- [DCANZ milk production](https://dcanz.com/resources/): national milk solids collected for processing.
- [Stats NZ overseas merchandise trade](https://www.stats.govt.nz/large-datasets/csv-files-for-download/overseas-merchandise-trade-datasets/): domestic exports, HS10 0402210019, kilograms.

See [data preparation and validation](docs/data_preparation.md) for the exact selection and instructions. The selected WMP category is not all dairy exports. Exports are shipments, not unconstrained demand. Milk solids are not finished powder. No synthetic inputs are used.

## Status and next step

Monthly data audit, descriptive analysis and initial Excel validation complete. For 2022-2023 one-month-ahead validation, forecasting the same month last year reduced WAPE from 47.60% to 2.95% for milk supply and from 37.53% to 24.37% for WMP exports. These are validation results, not independent test results. Earlier milk supply has not yet been shown to improve export forecasting.

See [Excel analysis and validation](docs/excel_review.md) and the [Power Query preparation script](powerquery/MonthlyPlanning.m). The local workbook contains two native PivotTables; desktop refresh and the Power Query connection still need verification. Next: compare the export-only and supply-informed models across the proposed horizons before final evaluation.

The local data and workbook are excluded from version control until source reuse terms are verified.
