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
app.use(express.json());

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/todos', (req, res) => {
  console.log('123456789');

  // const { text } = req.body;
  // const id = (todos[todos.length - 1].id ?? 0) + 1;

  res.json({});
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
