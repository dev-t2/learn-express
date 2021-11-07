import http from 'http';

const port = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET') {
    if (url === '/') {
      res.end('Home');
    } else if (url === '/about') {
      res.end('About');
    } else {
      res.statusCode = 404;

      res.end('Not Found');
    }
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
