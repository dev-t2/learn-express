import express from 'express';

const app = express();

const port = 8080;

app.get('/', (req, res) => {
  return res.send('Hello Express');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
