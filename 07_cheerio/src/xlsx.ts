import xlsx from 'xlsx';
import path from 'path';

const app = () => {
  const workbook = xlsx.readFile(path.join(__dirname, 'file', 'data.xlsx'));
  const sheet = workbook.Sheets['영화 목록'];
  const data = xlsx.utils.sheet_to_json(sheet);

  console.log(data);
};

app();
