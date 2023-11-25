import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

const port = 8080;

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
