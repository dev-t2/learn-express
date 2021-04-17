const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const qs = require('querystring');

const {
  templateHtml,
  templateDescription,
  templateForm,
} = require('./template');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL);
  const pathName = url.pathname;

  try {
    if (req.method === 'GET') {
      if (pathName === '/') {
        let title = url.searchParams.get('id');
        let description = '';

        if (title) {
          const file = path.join(
            __dirname,
            'data',
            `${title.toLowerCase()}.txt`
          );

          description = await fs.readFile(file, { encoding: 'utf-8' });
        } else {
          title = 'Welcome';
          description = 'Hello, Node.js';
        }

        const contents = templateDescription({ title, description });
        const data = await templateHtml({ title, contents });

        res.writeHead(200);
        res.end(data);
      } else if (pathName === '/create') {
        const title = 'WEB - Create';
        const contents = templateForm();
        const data = await templateHtml({ title, contents });

        res.writeHead(200);
        res.end(data);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    } else if (req.method === 'POST') {
      if (pathName === '/create-process') {
        let body = '';

        req.on('data', data => {
          body += data;
        });

        req.on('end', () => {
          const { title, description } = qs.parse(body);

          console.log({ title, description });
        });

        res.writeHead(200);
        res.end('Success');
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    console.error(err);

    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

app.listen(PORT);
