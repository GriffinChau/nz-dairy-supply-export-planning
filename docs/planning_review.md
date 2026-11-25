# Additional planning review

## Scope

Extend the existing supply and export planning analysis without changing the historical model selection, adding operational planning claims or introducing synthetic data. The local version 09 workbook contains the original 22 sheets and four additional review sheets. Three native Power Query connections and two native PivotTables are retained. Desktop acceptance of the updated file is still pending.

## Refresh Control

Compare the refreshed MonthlyPlanning output with the fixed Monthly Data snapshot across all ten columns and 132 months. Calendar keys and export quantities must match exactly; milk quantities must agree within 0.001 kg, and the million-kg values within 0.000000001 million kg. The query itself validates the original source coverage. The worksheet reports SOURCE MATCH when the loaded output matches the historical snapshot; this is not a timestamp or evidence of a successful new refresh. If the source changes, preserve the existing evaluation, investigate revisions, rerun quality checks, and refit the historical coefficients if appropriate. Do not silently overwrite the snapshot.

All 132 rows matched in the supplied file. A separate formula test changing one domestic export quantity by 1 kg returned REVIEW REQUIRED; the released candidate retains the actual original values.

## Dairy Season Review

The June-May calendar is an additional planning view of the same 2015-2025 data. Milk solids and WMP exports have separate conditional-format heatmaps. Report full-season totals and season-on-season growth only where all 12 months are present. The incomplete boundary seasons 2014/15 and 2025/26 are labelled Incomplete in this historical view; the latter is not extended using the separate 2026 check.

| Full dairy season | Milk supply (million kg milk solids) | Domestic WMP exports (million kg powder) |
|---|---:|---:|
| 2023/24 | 1,883.16 | 1,389.09 |
| 2024/25 | 1,939.09 | 1,294.44 |
| Change | +2.97% | -6.81% |

This divergence reinforces the need to review the two volume series separately. It does not establish a causal relationship.

## Variance Review

Choose a year from 2016-2025 to compare domestic WMP export volumes against the preceding calendar year. In 2025:

| Measure | Volume (million kg) |
|---|---:|
| Gross decreases across months | 77.72 |
| Offsetting increases across months | 39.29 |
| Net annual change | -38.43 |
| May decrease | 27.86 |
| November decrease | 24.27 |

May and November accounted for 67.08% of gross monthly decreases, not 67.08% of the net annual change. Prioritise these two months for investigation of shipment timing and reliable market context. The top-two-decreases rule is a relative investigation prompt, not a business-approved materiality threshold or an actual-versus-plan measure.

## Additional 2026 forecast performance

Keep the same-month-2025 seasonal baseline fixed. Evaluate additional public observations from the original data package after model selection. January-May milk supply and January-July domestic WMP exports are evaluated separately, with missing milk actuals excluded. No additional tuning.

| Series | Actual months | WAPE | MAE (million kg) | Signed bias |
|---|---:|---:|---:|---:|
| Milk supply | 5 | 5.92% | 10.20 | -5.92% |
| Domestic WMP exports | 7 | 13.02% | 16.25 | -10.13% |

Negative bias indicates underforecasting (forecast minus actual). This short partial-year evaluation is retrospective, uses revised public data and does not establish future accuracy. Monitor bias monthly and investigate sustained underforecasting before adjusting the baseline.

Source: DCANZ/NZX/DairyNZ original June 2026 milk workbook; Stats NZ Jan-Jul 2026 national export files. May-Jul export files use changed column names and formatted thousands separators; normalised for selection and validation. All seven selected export observations are Final, KGM, HS10 0402210019, with exact domestic plus re-export reconciliation. The milk workbook and full joined analysis remain local pending source reuse rights.

## Acceptance

The four additional sheets were constructed and independently checked against the audited master. Original worksheet, connection, query table, pivot cache and drawing parts were preserved byte-for-byte. The workbook contains 26 sheets and 5,449 formula cells with no cached formula error detected. The user still needs to open the candidate in desktop Excel, confirm no repair message, refresh all three queries, confirm the source-match gate, verify pivots and year selectors, and save/reopen. Executive Dashboard is deliberately deferred until the analytical workbook is accepted.
