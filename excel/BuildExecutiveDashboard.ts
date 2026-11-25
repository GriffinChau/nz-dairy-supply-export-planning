/**
 * Build an executive dashboard in the existing Excel workbook.
 * Uses the audited Monthly Data snapshot; checks the refreshed query separately.
 * No changes to source values, Power Query definitions or forecast coefficients.
 * Run on a backup copy in Excel. Not yet executed in desktop Excel.
 */
function main(workbook: ExcelScript.Workbook) {
  const snapshot = workbook.getWorksheet("Monthly Data");
  const query = workbook.getWorksheet("MonthlyPlanning");
  const forecast = workbook.getWorksheet("Forecast Review");
  if (!snapshot || !query || !forecast) throw new Error("Required sheets are missing.");
  if (workbook.getWorksheet("Executive Dashboard")) throw new Error("Executive Dashboard already exists. Keep it or rename it before rerunning.");
  const navy = "#20354D", teal = "#387D7A", slate = "#637180", pale = "#EAF2F1", white = "#FFFFFF";
  const dash = workbook.addWorksheet("Executive Dashboard");
  dash.setPosition(0);
  dash.setShowGridlines(false);
  const area = dash.getRange("A1:V44");
  area.getFormat().getFont().setName("Arial");
  area.getFormat().getFont().setSize(11);
  area.getFormat().getFont().setColor(navy);
  area.getFormat().setRowHeight(19);
  area.getFormat().setColumnWidth(75);
  area.getFormat().getFill().setColor(white);
  function banner(address: string, label: string, colour: string, size: number) {
    const r = dash.getRange(address);
    r.merge(false);
    r.getCell(0,0).setValue(label);
    r.getFormat().getFill().setColor(colour);
    r.getFormat().getFont().setColor(white);
    r.getFormat().getFont().setBold(true);
    r.getFormat().getFont().setSize(size);
    r.getFormat().setRowHeight(26);
  }
  function card(labelRange: string, valueRange: string, label: string, formula: string, fmt: string) {
    const l = dash.getRange(labelRange); l.merge(false); l.getCell(0,0).setValue(label);
    l.getFormat().getFill().setColor(pale); l.getFormat().getFont().setBold(true);
    const v = dash.getRange(valueRange); v.merge(false); v.getCell(0,0).setFormula(formula);
    v.setNumberFormat(fmt); v.getFormat().getFill().setColor(pale);
    v.getFormat().getFont().setSize(20); v.getFormat().getFont().setBold(true);
    v.getFormat().setRowHeight(29);
  }
  banner("A1:L1","NZ Dairy | Executive planning review",navy,18);
  dash.getRange("A2:L2").merge(false);
  dash.getRange("A2").setValue("Audited historical snapshot | 2015-2025 | All volume indicators in million kg");
  dash.getRange("A4:B4").merge(false); dash.getRange("A4").setValue("Review year");
  dash.getRange("C4").setValue(2025);
  dash.getRange("C4").getDataValidation().setRule({list:{inCellDropDown:true,source:"2016,2017,2018,2019,2020,2021,2022,2023,2024,2025"}});
  dash.getRange("C4").getFormat().getFill().setColor(pale);
  dash.getRange("D4:L4").merge(false);
  // Compare every row in the fixed query output against the audited snapshot.
  // Keep the review separate from refresh: revised source data require revalidation.
  const compare = "=IFERROR(IF(AND(COUNTA(MonthlyPlanning!A:A)=133,COUNT(MonthlyPlanning!A2:A133)=132,COUNT(MonthlyPlanning!E2:H133)=528,SUMPRODUCT(--(MonthlyPlanning!A2:D133<>'Monthly Data'!A2:D133))=0,SUMPRODUCT(--(ABS(MonthlyPlanning!E2:E133-'Monthly Data'!E2:E133)>0.001))=0,SUMPRODUCT(--(MonthlyPlanning!F2:H133<>'Monthly Data'!F2:H133))=0),\"SOURCE MATCH - audited snapshot\",\"REVIEW REQUIRED - source differs\"),\"REVIEW REQUIRED - check query\")";
  dash.getRange("D4").setFormula(compare);
  dash.getRange("D4:L4").getFormat().getFont().setBold(true);
  const warning = dash.getRange("D4:L4").addConditionalFormat(ExcelScript.ConditionalFormatType.custom);
  warning.getCustom().getRule().setFormula('=LEFT($D$4,6)="REVIEW"');
  warning.getCustom().getFormat().getFill().setColor("#FCE8D5");
  const total = (col: string, year: string) => "=SUMIFS('Monthly Data'!$"+col+"$2:$"+col+"$133,'Monthly Data'!$B$2:$B$133,"+year+")";
  card("A6:C6","A7:C8","Milk supply",total("I","$C$4"),"#,##0.0");
  card("D6:F6","D7:F8","Milk supply YoY",total("I","$C$4").substring(0)+"/"+total("I","$C$4-1").substring(1)+"-1","0.00%;[Red]-0.00%;0.00%");
  card("G6:I6","G7:I8","WMP domestic exports",total("J","$C$4"),"#,##0.0");
  card("J6:L6","J7:L8","WMP exports YoY",total("J","$C$4")+"/"+total("J","$C$4-1").substring(1)+"-1","0.00%;[Red]-0.00%;0.00%");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  dash.getRange("N5:P5").setValues([["Month","Selected year","Previous year"]]);
  dash.getRange("R5:T5").setValues([["Month","Selected year","Previous year"]]);
  for (let i=0;i<12;i++) {
    const r=i+6;
    dash.getRange("N"+r).setValue(months[i]);
    dash.getRange("R"+r).setValue(months[i]);
    for (const [out,col,yr] of [["O","I","$C$4"],["P","I","$C$4-1"],["S","J","$C$4"],["T","J","$C$4-1"]]) {
      dash.getRange(out+r).setFormula("=SUMIFS('Monthly Data'!$"+col+"$2:$"+col+"$133,'Monthly Data'!$B$2:$B$133,"+yr+",'Monthly Data'!$C$2:$C$133,"+(i+1)+")");
    }
  }
  const milk = dash.addChart(ExcelScript.ChartType.line, dash.getRange("N5:P17"), ExcelScript.ChartSeriesBy.columns);
  const exp = dash.addChart(ExcelScript.ChartType.line, dash.getRange("R5:T17"), ExcelScript.ChartSeriesBy.columns);
  function formatChart(chart: ExcelScript.Chart, title: string, start: string, end: string) {
    chart.setPosition(start,end);
    chart.getTitle().setText(title);
    chart.getTitle().getFormat().getFont().setName("Arial");
    chart.getLegend().setPosition(ExcelScript.ChartLegendPosition.bottom);
    const series=chart.getSeries();
    if(series.length>0) series[0].getFormat().getLine().setColor(teal);
    if(series.length>1) series[1].getFormat().getLine().setColor(slate);
  }
  formatChart(milk,"Milk supply | million kg","A10","G24");
  formatChart(exp,"Domestic WMP exports | million kg","G10","M24");
  banner("A26:L26","Forecast validation | fixed 2024-2025 test",navy,12);
  dash.getRange("A27:F30").setValues([["Horizon","Targets","Seasonal","Export only","Supply informed","Extra error (pp)"],["1 month",24,"","","",""],["2 months",23,"","","",""],["3 months",22,"","","",""]]);
  dash.getRange("A27:F27").getFormat().getFill().setColor(pale);
  dash.getRange("A27:F27").getFormat().getFont().setBold(true);
  dash.getRange("A27:F27").getFormat().setWrapText(true);
  dash.getRange("A27:F27").getFormat().setRowHeight(38);
  for(let i=0;i<3;i++) for(let j=0;j<4;j++) dash.getCell(27+i,2+j).setFormula("='Forecast Review'!"+String.fromCharCode(67+j)+(6+i));
  dash.getRange("C28:E30").setNumberFormat("0.00%");
  dash.getRange("F28:F30").setNumberFormat("0.00");
  dash.getRange("G27:L30").merge(false);
  dash.getRange("G27").setValue("Decision: retain the seasonal baseline. Adding earlier milk supply increased test error at all three horizons. Keep supply monitoring separate from export forecast overrides.");
  dash.getRange("G27:L30").getFormat().setWrapText(true);
  banner("A32:L32","Planning actions",teal,12);
  for (const [r,t] of [[33,"1. Confirm source match after Data > Refresh All. A changed source requires revalidation, not automatic overwrite."],[35,"2. Monitor supply and domestic export performance separately. Review opposite-direction months in Year Review."],[37,"3. Investigate material shipment deviations in Planning Exceptions before changing the outlook."],[39,"4. Use Forecast Review, Formula Guide and Data Lineage for the supporting evidence. National data are not company demand or inventory."]]) {
    const a=dash.getRange("A"+r+":L"+(Number(r)+1)); a.merge(false); a.getCell(0,0).setValue(t); a.getFormat().setWrapText(true);
  }
  dash.getRange("A42:L42").merge(false);
  dash.getRange("A42").setValue("Source: DCANZ / NZX / DairyNZ and Stats NZ. Forecasts are retrospective; no causal or inventory claims.");
  dash.getRange("A42:L42").getFormat().getFont().setColor(slate);
  // Format the three loaded query sheets without changing cells or connection definitions.
  for (const name of ["MilkSupply","WMPExports","MonthlyPlanning"]) {
    const s=workbook.getWorksheet(name);
    if(!s) continue;
    const used=s.getUsedRange();
    used.getFormat().getFont().setName("Arial");
    used.getFormat().getFont().setSize(11);
    s.setShowGridlines(false);
    for(const table of s.getTables()) table.setPredefinedTableStyle("TableStyleLight9");
    s.getRange("A:A").setNumberFormat("mmm yyyy");
    s.getFreezePanes().freezeRows(1);
  }
  dash.activate();
}
