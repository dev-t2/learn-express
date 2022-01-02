import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import morgan from 'morgan';
import path from 'path';

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

interface ISocket extends Socket {
  nickname?: string;
}

io.on('connection', (socket: ISocket) => {
  console.log(`Connected User: ${socket.id}`);

  socket.on('enter', (nickname) => {
    socket.nickname = nickname;

    io.emit('enter', { nickname });
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected User: ${socket.id}`);
  });

  socket.on('error', (err) => {
    console.error(err);
  });
});

server.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
