import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import { nanoid } from 'nanoid';

interface ITodo {
  id: string;
  content: string;
  isComplete: boolean;
}

let todos: ITodo[] = [];

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  express.static(path.join(__dirname, 'public'), { extensions: ['html'] })
);
app.use(express.json());

app.get('/api/todos', (req, res) => {
  return res.json({ isSuccess: true, todos });
});

interface ICreateTodoRequest extends Request {
  body: { content: string };
}

app.post('/api/todos', (req: ICreateTodoRequest, res) => {
  const { content } = req.body;

  if (content === undefined || typeof content !== 'string' || !content.trim()) {
    return res.json({ isSuccess: false });
  }

  const todo: ITodo = { id: nanoid(), content, isComplete: false };

  todos = [...todos, todo];

  return res.json({ isSuccess: true, todo });
});

interface IUpdateIsCompleteRequest extends Request {
  params: { id: string };
  body: { isComplete: boolean };
}

app.put('/api/todos/:id/isComplete', (req: IUpdateIsCompleteRequest, res) => {
  const { id } = req.params;
  const { isComplete } = req.body;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.json({ isSuccess: false });
  }

  if (isComplete === undefined || typeof isComplete !== 'boolean') {
    return res.json({ isSuccess: false });
  }

  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isComplete };
    }

    return todo;
  });

  return res.json({ isSuccess: true });
});

interface IUpdateContentRequest extends Request {
  params: { id: string };
  body: { content: string };
}

app.put('/api/todos/:id/content', (req: IUpdateContentRequest, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.json({ isSuccess: false });
  }

  if (content === undefined || typeof content !== 'string' || !content.trim()) {
    return res.json({ isSuccess: false });
  }

  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, content };
    }

    return todo;
  });

  return res.json({ isSuccess: true });
});

app.delete('/api/todos', (req, res) => {
  todos = [];

  return res.json({ isSuccess: true });
});

interface IDeleteTodoRequest extends Request {
  params: { id: string };
}

app.delete('/api/todos/:id', (req: IDeleteTodoRequest, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.json({ isSuccess: false });
  }

  todos = todos.filter((todo) => todo.id !== id);

  return res.json({ isSuccess: true });
});

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
