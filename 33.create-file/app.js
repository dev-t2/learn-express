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
const DATA_PATH = path.join(__dirname, 'data');

const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL);
  const pathName = url.pathname;

  try {
    if (req.method === 'GET') {
      if (pathName === '/') {
        let title = url.searchParams.get('id');
        let description = '';

        if (title) {
          const filePath = path.join(DATA_PATH, `${title}.txt`);

          description = await fs.readFile(filePath, { encoding: 'utf-8' });
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

        req.on('end', async () => {
          const { title, description } = qs.parse(body);
          const filePath = path.join(DATA_PATH, `${title}.txt`);

          await fs.writeFile(filePath, description, { encoding: 'utf-8' });

          res.writeHead(302, { Location: `/?id=${title}` });
          res.end();
        });
      }
    }
  } catch (err) {
    console.error(err);

    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

app.listen(PORT);
