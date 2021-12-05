import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

const todos: Todo[] = [];

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.json({ isSuccess: true, todos });
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;

  const id = (todos[todos.length - 1]?.id ?? 0) + 1;
  const todo: Todo = { id, text, isDone: false };

  todos.push(todo);

  res.json({ isSuccess: true, todo });
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

  if (index >= 0) {
    todos[index].isDone = isDone;

    res.json({ isSuccess: true });
  } else {
    res.json({ isSuccess: false });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));

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
