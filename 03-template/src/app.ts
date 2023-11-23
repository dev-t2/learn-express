import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

const port = 8080;

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.send('Hello Express');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
