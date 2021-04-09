const http = require('http');
const fs = require('fs').promises;

const template = require('./template');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL);

  try {
    const title = url.searchParams.get('id');
    const description = await fs.readFile(`./data/${title.toLowerCase()}.txt`, {
      encoding: 'utf-8',
    });

    const data = template({ title, description });

    res.writeHead(200);
    res.end(data);
  } catch (err) {
    res.writeHead(404);
  }
});

app.listen(PORT);
