const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const { createList } = require('./lib');
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
    if (pathName === '/') {
      const { folderPath, list } = await createList();

      let title = url.searchParams.get('id');
      let description = '';

      if (title) {
        const file = path.join(folderPath, `${title.toLowerCase()}.txt`);

        description = await fs.readFile(file, { encoding: 'utf-8' });
      } else {
        title = 'Welcome';
        description = 'Hello, Node.js';
      }

      const contents = templateDescription({ title, description });
      const data = templateHtml({ title, list, contents });

      res.writeHead(200);
      res.end(data);
    } else if (pathName === '/create') {
      const { list } = await createList();

      const title = 'WEB - Create';
      const contents = templateForm();
      const data = templateHtml({ title, list, contents });

      res.writeHead(200);
      res.end(data);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  } catch (err) {
    console.error(err);

    res.writeHead(404);
    res.end('Not Found');
  }
});

app.listen(PORT);
