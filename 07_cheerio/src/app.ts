import xlsx from 'xlsx';
import path from 'path';

const workbook = xlsx.readFile(path.join(__dirname, 'data.xlsx'));
const sheet = workbook.Sheets['영화 목록'];
const data = xlsx.utils.sheet_to_json(sheet);

console.log(data);
