import http from 'http';

const server = http.createServer((_, res) => {
  res.end('Hello World');
});

const port = 3000;

server.listen(port, () => {
  console.log(`Running http server at http://localhost:${port}`);
});
