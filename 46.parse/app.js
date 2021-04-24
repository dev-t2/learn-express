const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const qs = require('querystring');

const template = require('./lib/template');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const DATA_PATH = path.join(__dirname, 'data');

const app = http.createServer(async (req, res) => {
  const url = new URL(req.url, BASE_URL);
  const pathName = url.pathname;

  try {
    if (req.method === 'GET') {
      if (pathName === '/') {
        const title = url.searchParams.get('id');

        let filteredTitle = title ? path.parse(title).base : '';
        let controls = [];
        let description = '';

        if (filteredTitle) {
          const filePath = path.join(DATA_PATH, `${filteredTitle}.txt`);

          controls = ['create', 'update', 'delete'];
          description = await fs.readFile(filePath, { encoding: 'utf-8' });
        } else {
          filteredTitle = 'Welcome';
          controls = ['create'];
          description = 'Hello, Node.js';
        }

        const contents = template.description({
          title: filteredTitle,
          description,
        });
        const html = await template.html({
          title: filteredTitle,
          controls,
          contents,
        });

        res.writeHead(200);
        res.end(html);
      } else if (pathName === '/create') {
        const title = 'WEB - Create';

        const contents = template.form({ path: '/create-process' });
        const html = await template.html({ title, contents });

        res.writeHead(200);
        res.end(html);
      } else if (pathName === '/update') {
        const title = url.searchParams.get('id');
        const filteredTitle = path.parse(title).base;
        const filePath = path.join(DATA_PATH, `${filteredTitle}.txt`);
        const description = await fs.readFile(filePath, { encoding: 'utf-8' });

        const contents = template.form({
          path: '/update-process',
          title,
          description,
        });
        const html = await template.html({ title, contents });

        res.writeHead(200);
        res.end(html);
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
          const filteredTitle = path.parse(title).base;
          const filePath = path.join(DATA_PATH, `${filteredTitle}.txt`);

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
          const filteredId = path.parse(id).base;
          const filteredTitle = path.parse(title).base;
          const oldPath = path.join(DATA_PATH, `${filteredId}.txt`);
          const newPath = path.join(DATA_PATH, `${filteredTitle}.txt`);

          await fs.rename(oldPath, newPath);
          await fs.writeFile(newPath, description, { encoding: 'utf-8' });

          res.writeHead(302, { Location: `/?id=${title}` });
          res.end();
        });
      } else if (pathName === '/delete-process') {
        let body = '';

        req.on('data', data => {
          body += data;
        });

        req.on('end', async () => {
          const { id } = qs.parse(body);
          const filteredId = path.parse(id).base;
          const filePath = path.join(DATA_PATH, `${filteredId}.txt`);

          await fs.unlink(filePath);

          res.writeHead(302, { Location: `/` });
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
