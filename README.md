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

Monthly data audit and descriptive review complete. Next: reproduce preparation with Power Query, build native PivotTables, then test forecast methods on unseen periods. No forecast accuracy or operational improvements have been verified yet.

The local data and workbook are excluded from version control until source reuse terms are verified.
