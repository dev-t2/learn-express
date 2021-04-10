const http = require('http');
const fs = require('fs').promises;

const template = require('./template');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL);
  const pathname = url.pathname;

  try {
    if (pathname === '/') {
      let title = url.searchParams.get('id');
      let description = '';

      if (title === null) {
        title = 'Welcome';
        description = 'Hello, Node.js';
      } else {
        description = await fs.readFile(`./data/${title.toLowerCase()}.txt`, {
          encoding: 'utf-8',
        });
      }

      res.writeHead(200);
      res.end(template({ title, description }));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    console.error(err);

    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

app.listen(PORT);
