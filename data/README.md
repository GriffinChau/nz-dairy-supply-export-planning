# Data sources and reuse

Source: Stats NZ. This work includes Stats NZ data licensed for reuse under the [Creative Commons Attribution 4.0 International licence](https://creativecommons.org/licenses/by/4.0/).

- [Original overseas merchandise trade datasets](https://www.stats.govt.nz/large-datasets/csv-files-for-download/overseas-merchandise-trade-datasets/)
- [Stats NZ copyright and reuse](https://www.stats.govt.nz/about-us/copyright/)

The public extract contains 132 original selected monthly HS10 0402210019 records, 2015-2025, retaining seven source fields (month, hs, uom, Export_Qty, Re_export_Qty, total_export_qty and status). Other source columns and product codes are omitted. Quantities are unchanged. Treat hs as text to retain the leading zero. SHA256: 8ef4c2b9ca4b9388019770db24b25d8a5b61c004420d13d86bd9b12b7539a9f6.

## Original annual export files

All eleven unchanged annual national HS10 export CSVs are available in [data/raw/](raw/), covering January 2015 to December 2025 and 735,118 records before filtering. On 25 November 2026, all eleven remote Git blob identifiers and file sizes matched the original local source package; the local SHA-256 checksums and row counts also matched [the source manifest](raw_source_manifest.csv). The 132-row public extract is a filtered subset, not a replacement for the raw files.

Download the individual CSVs from the raw directory or download the repository ZIP. Preserve the original filenames and contents when reproducing the analysis.

Milk production is sourced from [DCANZ](https://dcanz.com/resources/), NZX and DairyNZ. The original milk source workbook is not distributed separately. The published [Excel planning workbook](../excel/NZ_Dairy_Planning_Intelligence.xlsx) may contain embedded milk records and joined data; redistribution permission for the milk source has not been independently confirmed. Download the original workbook independently for reproduction. The Stats NZ licence does not cover milk data. No synthetic inputs are used.

## Processed data and outputs

- [Processed WMP exports](processed/wmp_exports_cleaned.csv): 132 monthly records in the analysis-ready query format. The existing public extract preserves original field names for traceability.
- [Forecast evaluation](outputs/forecast_evaluation.csv): 18 aggregate model scores from the saved workbook.
- [2026 export performance](outputs/forecast_performance_2026.csv): seven additional export observations and their unchanged seasonal forecasts.
- [Planning exceptions](outputs/planning_exceptions.csv): 24 test months and the fixed review threshold.

See [processed data notes](processed/README.md) and [output definitions](outputs/README.md). Cleaned milk supply, the complete joined dataset and row-level supply-informed model inputs are not provided as separate CSV downloads. The original 735,118 export records are filtered before appending; no redundant all-product merged CSV is needed.
