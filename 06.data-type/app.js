const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const app = http.createServer(async (req, res) => {
  let url = req.url;

  if (url === '/') {
    url = 'index.html';
  }

  if (url === '/favicon.ico') {
    return res.writeHead(404);
  }

  const filePath = path.join(__dirname, url);
  const file = await fs.readFile(filePath);

  res.writeHead(200);
  res.end(file);
});

app.listen(3000);
