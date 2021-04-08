const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const app = http.createServer((req, res) => {
  const url = new URL(req.url, BASE_URL);

  if (url.pathname === '/favicon.ico') {
    return res.writeHead(404);
  }

  res.writeHead(200);
  res.end(url.searchParams.get('id'));
});

app.listen(PORT);
