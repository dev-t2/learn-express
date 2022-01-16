import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import path from 'path';

interface IUser {
  id: string;
  nickname: string;
}

const users: IUser[] = [];

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).send('Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).send('Internal Server Error');
});

io.on('connection', (socket) => {
  socket.on('enter', (nickname: string) => {
    users.push({ id: socket.id, nickname });

    io.emit('enter', users);
  });

  socket.on('error', (err) => {
    console.error(err);
  });
});

server.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
