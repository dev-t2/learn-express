import puppeteer from 'puppeteer';

const movies = [
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
  console.time('dt');

  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'production',
  });

  const promises = movies.map(async (movie) => {
    const page = await browser.newPage();

    await page.goto(movie.link);

    const handle = await page.$('.score.score_left > .star_score');
    const score = await page.evaluate((element) => element.innerText, handle);

    await page.waitForTimeout(5000);
    await page.close();

    return { title: movie.title, score: parseFloat(score) };
  });

  const result = await Promise.all(promises);

  await browser.close();

  console.log(result);
  console.log();
  console.timeEnd('dt');
};

app();
