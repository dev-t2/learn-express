import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'home', content: 'Hello NodeJS' });
});

app.use((req, res) => {
  res.status(404).render('index', {
    title: '404 - Not Fount',
    content: 'Not Found',
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).render('index', {
    title: '500 - Internal Server Error',
    content: 'Internal Server Error',
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
