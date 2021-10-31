import express from 'express';

const app = express();
const port = 8080;

app.use((req, res, next) => {
  console.log('middleware');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
