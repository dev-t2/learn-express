import express from 'express';
import morgan from 'morgan';

const app = express();

const port = 8080;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.send('Hello Express');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
