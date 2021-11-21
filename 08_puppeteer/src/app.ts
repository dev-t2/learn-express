import puppeteer from 'puppeteer';

const app = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.naver.com');
  await page.waitForTimeout(5000);
  await page.close();

  await browser.close();
};

app();
