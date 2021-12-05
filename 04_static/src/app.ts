import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
