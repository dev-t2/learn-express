import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import { nanoid } from 'nanoid';

interface ITodo {
  id: string;
  content: string;
  isComplete: boolean;
}

const todos: ITodo[] = [];

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  express.static(path.join(__dirname, 'public'), { extensions: ['html'] })
);
app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.json({ isSuccess: true, todos });
});

interface ICreateTodoRequest extends Request {
  body: {
    content: string;
  };
}

app.post('/api/todos', (req: ICreateTodoRequest, res) => {
  const { content } = req.body;

  const todo: ITodo = { id: nanoid(), content, isComplete: false };

  todos.push(todo);

  res.json({ isSuccess: true, todo });
});

interface IUpdateTodoRequest extends Request {
  params: {
    id: string;
  };
  body: {
    isComplete: boolean;
  };
}

app.put('/api/todos/:id', (req: IUpdateTodoRequest, res) => {
  const { id } = req.params;
  const { isComplete } = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index >= 0) {
    todos[index].isComplete = isComplete;

    res.json({ isSuccess: true });
  } else {
    res.json({ isSuccess: false });
  }
});

interface IDeleteTodoRequest extends Request {
  params: {
    id: string;
  };
}

app.delete('/api/todos/:id', (req: IDeleteTodoRequest, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index >= 0) {
    todos.splice(index, 1);

    res.json({ isSuccess: true });
  } else {
    res.json({ isSuccess: false });
  }
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
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
