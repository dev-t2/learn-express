const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const template = require('./template');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL);
  const pathname = url.pathname;

  try {
    if (pathname === '/') {
      const title = url.searchParams.get('id') ?? 'Welcome';
      const filePath = path.join(
        __dirname,
        'data',
        `${title.toLowerCase()}.txt`
      );
      const description = await fs.readFile(filePath, {
        encoding: 'utf-8',
      });
      const data = template({ title, description });

      res.writeHead(200);
      res.end(data);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    res.writeHead(404);
    res.end('Not Found');
  }
});

app.listen(PORT);
