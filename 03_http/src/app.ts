import http from 'http';

const port = 8080;

const app = http.createServer((req, res) => {
  res.end('Hello NodeJS');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
