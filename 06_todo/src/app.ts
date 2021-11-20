import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';

type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

const todos: Todo[] = [];

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

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
  res.status(404).render('404');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).render('500');
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
