const xlsx = require('xlsx');

const workbook = xlsx.readFile('/Users/sanjeevn/Downloads/BRS app/Thungathurthi (96).xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet);
console.log("Headers:");
if (data.length > 0) {
  console.log(Object.keys(data[0]));
  console.log("First 5 rows:");
  console.log(data.slice(0, 5));
} else {
  console.log("Sheet is empty");
}
