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

  todos.push(todo);

  return res.json({ isSuccess: true, todo });
});

interface IUpdateTodoRequest extends Request {
  params: { id: string };
  body: {
    content: string;
    isComplete: boolean;
  };
}

app.put('/api/todos/:id', (req: IUpdateTodoRequest, res) => {
  const { id } = req.params;
  const { content, isComplete } = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.json({ isSuccess: false });
  }

  if (
    content !== undefined &&
    (typeof content !== 'string' || !content.trim())
  ) {
    return res.json({ isSuccess: false });
  }

  if (isComplete !== undefined && typeof isComplete !== 'boolean') {
    return res.json({ isSuccess: false });
  }

  todos[index] = {
    ...todos[index],
    content: content ?? todos[index].content,
    isComplete: isComplete ?? todos[index].isComplete,
  };

  return res.json({ isSuccess: true });
});

app.delete('/api/todos', (req, res) => {
  todos.length = 0;

  return res.json({ isSuccess: true });
});

interface IDeleteTodosRequest extends Request {
  params: { id: string };
}

app.delete('/api/todos/:id', (req: IDeleteTodosRequest, res) => {
  const { id } = req.params;

  const ids = id.split(',');

  const reverseIndexes = todos.reduceRight((indexes: number[], todo, index) => {
    if (ids.includes(todo.id)) {
      return [...indexes, index];
    }

    return indexes;
  }, []);

  if (ids.length !== reverseIndexes.length) {
    return res.json({ isSuccess: false });
  }

  reverseIndexes.forEach((reverseIndex) => {
    todos.splice(reverseIndex, 1);
  });

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
