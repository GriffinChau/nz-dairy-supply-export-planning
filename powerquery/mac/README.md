# Native Excel Power Query setup

The three-query approach succeeded in the user's Excel for Mac session on 25 November 2026, using actual local paths. These templates preserve the transformation logic and replace the private path with a placeholder.

1. Create a Blank Query, paste MilkSupply.m and replace /path/to/data/raw with the actual path. Name it MilkSupply.
2. Create a Blank Query, paste WMPExports.m and replace the same path in all 11 File.Contents calls. Name it WMPExports. The explicit paths and explicit source steps avoid the earlier dynamic-source gateway issue in the user's environment.
3. Create a Blank Query, paste MonthlyPlanning.m and name it MonthlyPlanning.
4. Close & Load. Check the expected counts: MilkSupply 132 x 3; WMPExports 132 x 7; MonthlyPlanning 132 x 10.
5. Save, refresh and follow [desktop acceptance](../../docs/excel_acceptance.md). Do not overwrite the audited Monthly Data snapshot without revalidation.

If a gateway error appears when combining trusted public sources, inspect Power Query project options and source permissions. Use the setting for combining multiple sources only when appropriate for these public data sources. Do not install a gateway as a first response to a local-file preview error.

The legacy single-query reference in the parent folder is retained for historical comparison; the three-query setup is the current Mac reproduction route.
