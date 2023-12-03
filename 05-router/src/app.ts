import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import UsersRouter from './users/router';

const port = 8080;

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.use('/users', UsersRouter);

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
