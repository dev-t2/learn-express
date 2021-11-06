import express from 'express';

const app = express();

app.set('port', 8080);

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}/`);
});
