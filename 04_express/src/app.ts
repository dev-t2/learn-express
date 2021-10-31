import express from 'express';

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
  // res.send('Hello NodeJS');

  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}/`);
});
