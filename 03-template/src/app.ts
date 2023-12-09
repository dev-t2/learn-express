import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import morgan from 'morgan';

const port = 8080;

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));

app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('home', { layout: false, message: 'Hello Handlebars' });
});

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Listening and serving HTTP on :${port}`);
});
