import xlsx from 'xlsx';
import path from 'path';
import axios from 'axios';
import cheerio from 'cheerio';

interface Item {
  [key: string]: string;
}

const app = async () => {
  const workbook = xlsx.readFile(path.join(__dirname, 'data.xlsx'));
  const sheet = workbook.Sheets['영화 목록'];
  const items: Item[] = xlsx.utils.sheet_to_json(sheet);

  await Promise.all(
    items.map(async (item) => {
      const { data } = await axios.get(item['링크']);

      const $ = cheerio.load(data);
      const score = $('.score.score_left > .star_score').text().trim();

      console.log(`영화: ${item['영화']}, 평점: ${score}`);
    })
  );
};

app();
