import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import TodosRouter from './todos/todos.router';

const app = express();

const port = 8080;

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', TodosRouter);

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
