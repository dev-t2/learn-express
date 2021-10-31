import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.set('port', 8080);

app.use((req, res, next) => {
  console.log('middleware');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
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
  console.log(`Server running at http://localhost:${app.get('port')}/`);
});
