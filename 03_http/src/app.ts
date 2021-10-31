import http from 'http';
import fs from 'fs/promises';

const port = 8080;

const app = http.createServer(async (req, res) => {
  // res.end('Hello NodeJS');

  console.log({ url: req.url, method: req.method });

  try {
    const file = await fs.readFile(`${__dirname}/public/index.html`);

    res.statusCode = 200;
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.end((e as Error).message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
