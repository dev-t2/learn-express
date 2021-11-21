import puppeteer from 'puppeteer';

const app = async () => {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === 'production',
  });
  const [page] = await Promise.all([browser.newPage()]);

  await Promise.all([page.goto('https://www.naver.com')]);
  await Promise.all([page.waitForTimeout(5000)]);
  await Promise.all([page.close()]);

  await browser.close();
};

app();
