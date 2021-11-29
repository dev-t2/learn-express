import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
  try {
    const { pathname, query } = url.parse(req.url ?? '', true);

    if (pathname === '/' && req.method === 'GET') {
      console.log(query);

      res.end('Hello NodeJS');
    } else {
      res.statusCode = 404;

      res.end('Not Found');
    }
  } catch (err) {
    console.error(err);

    res.statusCode = 500;

    res.end('Internal Server Error');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
