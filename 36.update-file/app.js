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
        let controls = [];
        let description = '';

        if (title) {
          const filePath = path.join(DATA_PATH, `${title}.txt`);

          controls = ['create', 'update'];
          description = await fs.readFile(filePath, { encoding: 'utf-8' });
        } else {
          title = 'Welcome';
          controls = ['create'];
          description = 'Hello, Node.js';
        }

        const contents = templateDescription({ title, description });
        const data = await templateHtml({ title, controls, contents });

        res.writeHead(200);
        res.end(data);
      } else if (pathName === '/create') {
        const title = 'WEB - Create';

        const contents = templateForm({ path: '/create-process' });
        const data = await templateHtml({ title, contents });

        res.writeHead(200);
        res.end(data);
      } else if (pathName === '/update') {
        const title = url.searchParams.get('id');
        const filePath = path.join(DATA_PATH, `${title}.txt`);
        const description = await fs.readFile(filePath, { encoding: 'utf-8' });

        const contents = templateForm({
          path: '/update-process',
          title,
          description,
        });
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
      } else if (pathName === '/update-process') {
        let body = '';

        req.on('data', data => {
          body += data;
        });

        req.on('end', async () => {
          const { id, title, description } = qs.parse(body);
          const oldPath = path.join(DATA_PATH, `${id}.txt`);
          const newPath = path.join(DATA_PATH, `${title}.txt`);

          await fs.rename(oldPath, newPath);
          await fs.writeFile(newPath, description, { encoding: 'utf-8' });

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
