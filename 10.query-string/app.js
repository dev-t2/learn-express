const http = require('http');

const BASE_URL = 'http://localhost:3000';

const app = http.createServer((req, res) => {
  const url = new URL(req.url, BASE_URL);

  res.writeHead(200);
  res.end(url.searchParams.get('id'));
});

app.listen(3000);
