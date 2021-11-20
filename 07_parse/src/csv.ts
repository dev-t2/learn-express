import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

const app = async () => {
  const csv = await fs.readFile(path.join(__dirname, 'file', 'data.csv'));
  const data: string[][] = parse(csv.toString('utf-8'));

  console.log(data);
};

app();
