import path from 'path';
import fs from 'fs/promises';
import puppeteer from 'puppeteer';

const POSTER_PATH = path.join(__dirname, 'poster');
const SCREENSHOT_PATH = path.join(__dirname, 'screenshot');

interface IMovie {
  title: string;
  link: string;
  score?: number;
  poster?: string;
}

const movies: IMovie[] = [
  {
    title: '장르만 로맨스',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=185264',
  },
  {
    title: '이터널스',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=184311',
  },
  {
    title: '프렌치 디스패치',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=187312',
  },
  {
    title: '너에게 가는 길',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=203715',
  },
  {
    title: '듄',
    link: 'https://movie.naver.com/movie/bi/mi/basic.naver?code=191559',
  },
];

const app = async () => {
  try {
    await fs.readdir(POSTER_PATH);
  } catch (err) {
    await fs.mkdir(POSTER_PATH);
  }

  try {
    await fs.readdir(SCREENSHOT_PATH);
  } catch (err) {
    await fs.mkdir(SCREENSHOT_PATH);
  }

  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'production',
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
  );

  for (let i = 0; i < movies.length; i++) {
    await page.goto(movies[i].link);

    const result = await page.evaluate(() => {
      const score = document.querySelector('.score.score_left > .star_score');
      const poster = document.querySelector<HTMLImageElement>('.poster img');

      return { score: parseFloat(score.textContent), poster: poster.src };
    });

    movies[i] = { ...movies[i], score: result.score, poster: result.poster };

    console.log(movies[i]);

    await page.waitForTimeout(1000);
  }

  await page.close();
  await browser.close();
};

app();
