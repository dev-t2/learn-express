const http = require('http');

const template = require('./template');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const app = http.createServer((req, res) => {
  const url = new URL(req.url, BASE_URL);
  const title = url.searchParams.get('id');
  const data = template(title);

  if (url.pathname === '/favicon.ico') {
    return res.writeHead(404);
  }

  res.writeHead(200);
  res.end(data);
});

app.listen(PORT);
