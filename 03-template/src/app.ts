import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

const port = 8080;

app.set('view engine', 'pug');

app.set('views', './src/views');

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/template', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/', (req, res) => {
  return res.send('Hello Express');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
