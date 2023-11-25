import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();

const port = 8080;

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
