const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('/Users/sanjeevn/Downloads/BRS app/Thungathurthi (96).xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Skip the first row (the title row) and use the second row as headers
const data = xlsx.utils.sheet_to_json(sheet, { range: 1 });

const villages = new Set();
data.forEach(row => {
  if (row['Part Name']) {
    villages.add(row['Part Name'].trim());
  }
});

const sortedVillages = Array.from(villages).sort();
console.log(`Found ${sortedVillages.length} unique villages.`);

fs.writeFileSync('/Users/sanjeevn/Downloads/BRS app/src/assets/villages.json', JSON.stringify(sortedVillages, null, 2));
console.log('Saved to src/assets/villages.json');
