import http from 'http';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    if (url === '/') {
      res.end('Hello NodeJS');
    } else {
      res.statusCode = 404;

      res.end('Not Found');
    }
  } else {
    res.statusCode = 500;

    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
