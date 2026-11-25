# Native Excel Power Query setup

The workbook uses three native Power Query connections to import and reconcile the original source files. The templates use placeholder paths; replace them with the full paths to your local source files.

1. Create a Blank Query, paste MilkSupply.m and replace /path/to/data/raw with the actual path. Name it MilkSupply.
2. Create a Blank Query, paste WMPExports.m and replace the same path in all 11 File.Contents calls. Name it WMPExports. Each annual source is imported explicitly before filtering and appending.
3. Create a Blank Query, paste MonthlyPlanning.m and name it MonthlyPlanning.
4. Close & Load. Check the expected counts: MilkSupply 132 x 3; WMPExports 132 x 7; MonthlyPlanning 132 x 10.
5. Save, refresh and follow [desktop acceptance](../../docs/excel_acceptance.md). Do not overwrite the audited Monthly Data snapshot without revalidation.

If a gateway error appears when combining trusted public sources, inspect Power Query project options and source permissions. Use the setting for combining multiple sources only when appropriate for these public data sources. Do not install a gateway as a first response to a local-file preview error.

The legacy single-query reference in the parent folder is retained for historical comparison; use the three-query setup for the current workbook.
