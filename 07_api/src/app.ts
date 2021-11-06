import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

app.set('port', 8080);

type Board = {
  id: number;
  title: string;
  content: string;
};

let boards: Board[] = [];

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.get('/board', (req, res) => {
  res.send(boards);
});

app.post('/board', (req, res) => {
  const { title, content } = req.body;

  const id = (boards[boards.length - 1]?.id ?? 0) + 1;

  boards = [...boards, { id, title, content }];

  res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  boards = boards.map((board) => {
    if (board.id === parseInt(id)) {
      return { id: parseInt(id), title, content };
    }

    return board;
  });

  res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
  const { id } = req.params;

  boards = boards.filter((board) => {
    return board.id !== parseInt(id, 10);
  });

  res.redirect('/board');
});

app.get('/board/:keyword', (req, res) => {
  const { keyword } = req.params;

  const result = boards.filter((board) => {
    const { title, content } = board;

    return title.includes(keyword) || content.includes(keyword);
  });

  res.send(result);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}/`);
});
