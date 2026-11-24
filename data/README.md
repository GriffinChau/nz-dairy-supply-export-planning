# Data sources and reuse

Source: Stats NZ. This work includes Stats NZ data licensed for reuse under the [Creative Commons Attribution 4.0 International licence](https://creativecommons.org/licenses/by/4.0/).

- [Original overseas merchandise trade datasets](https://www.stats.govt.nz/large-datasets/csv-files-for-download/overseas-merchandise-trade-datasets/)
- [Stats NZ copyright and reuse](https://www.stats.govt.nz/about-us/copyright/)

The public extract contains 132 original selected monthly HS10 0402210019 records, 2015-2025, retaining seven source fields (month, hs, uom, Export_Qty, Re_export_Qty, total_export_qty and status). Other source columns and product codes are omitted. Quantities are unchanged. Treat hs as text to retain the leading zero. SHA256: 8ef4c2b9ca4b9388019770db24b25d8a5b61c004420d13d86bd9b12b7539a9f6.

The eleven unchanged annual CSVs are prepared separately for upload to data/raw/. They have not yet been pushed. The public extract is not a replacement for those original files. See raw_source_manifest.csv to check their bytes and row counts.

Milk production is sourced from [DCANZ](https://dcanz.com/resources/), NZX and DairyNZ. The original workbook, extracted milk records, joined dataset and Excel working file remain local pending confirmation of reuse rights. Download the original workbook independently for reproduction. The Stats NZ licence does not cover milk data. No synthetic inputs are used.
