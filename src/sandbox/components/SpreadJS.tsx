import { useState } from 'react';
import * as GC from '@mescius/spread-sheets';
import { SpreadSheets, Worksheet } from '@mescius/spread-sheets-react';
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css';

function SpreadJS() {
  const [hostStyle, setHostStyle] = useState({
    width: '800px',
    height: '600px'
  });

  // const initSpread = function (spread: GC.Spread.Sheets.Workbook) {
  //   const sheet = spread.getActiveSheet();
  //   sheet.getCell(0, 0).vAlign(GC.Spread.Sheets.VerticalAlign.center).value('Hello SpreadJS!');
  // }

  const initSpread = function initSpread(spread: GC.Spread.Sheets.Workbook) {
    let sheet = spread.getActiveSheet();
    //Setting Values - Text
    sheet.setValue(1, 1, "Setting Values");
    //Setting Values - Number
    sheet.setValue(2, 1, "Number");
    sheet.setValue(2, 2, 23);
    sheet.setValue(3, 1, "Text");
    sheet.setValue(3, 2, "SpreadJS");
    sheet.setValue(4, 1, "Datetime");
    //Setting Values - DateTime
    sheet.getCell(4, 2).value(new Date(2020, 10, 7)).formatter("mm-dd-yyyy");
  }

  return (
    <>
      <div className="sample-spreadsheets mt-5">
        <SpreadSheets hostStyle={hostStyle} workbookInitialized={spread => initSpread(spread)}>
          <Worksheet name="Sheet1"></Worksheet>
        </SpreadSheets>
      </div>
    </>
  )
}

export default SpreadJS;

/*
initSpread: function (spread) {
  //initialize the spread
  let sheet = spread.getActiveSheet();
  //Setting Values - Text
  sheet.setValue(1, 1, "Setting Values");
  //Setting Values - Number 
  sheet.setValue(2, 1, "Number");
  sheet.setValue(2, 2, 23)
  sheet.setValue(3, 1, "Text");
  sheet.setValue(3, 2, "SpreadJS")
  sheet.setValue(4, 1, "Datetime");
  //Setting Values - DateTime
  sheet.getCell(4, 2).value(new Date(2020, 10, 7)).formatter("mm-dd-yyyy");
  //Setting style
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 200);
  sheet.getRange(1, 1, 1, 2).backColor("rgb(130, 188, 0)").foreColor("rgb(255, 255, 255)");
  sheet.getRange(3, 1, 1, 2).backColor("rgb(211, 211, 211)");
  sheet.addSpan(1, 1, 1, 2);
  sheet.getRange(1, 1, 4, 2).setBorder(new GC.Spread.Sheets.LineBorder("Black", GC.Spread.Sheets.LineStyle.thin), {
    all: true
  });
  sheet.getRange(1, 1, 4, 2).setBorder(new GC.Spread.Sheets.LineBorder("Black", GC.Spread.Sheets.LineStyle.dotted), {
    inside: true
  });
  sheet.getRange(1, 1, 1, 2).hAlign(GC.Spread.Sheets.HorizontalAlign.center);
}
*/

/*
initSpread: function (spread) {
   var sheet = spread.getSheet(0);
   var person = { name: 'Peter Winston', age: 25, gender: 'Male', address: { postcode: '10001' } };
   var source = new GC.Spread.Sheets.Bindings.CellBindingSource(person);
   sheet.setBindingPath(2, 2, 'name');
   sheet.setBindingPath(3, 2, 'age');
   sheet.setBindingPath(4, 2, 'gender');
   sheet.setBindingPath(5, 2, 'address.postcode');
   sheet.setDataSource(source);
}
*/
