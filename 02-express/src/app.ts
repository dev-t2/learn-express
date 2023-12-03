import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

const port = 8080;

app.use(morgan('dev'));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
  return res.send('Hello Express');
});

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
