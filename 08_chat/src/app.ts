import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  express.static(path.join(__dirname, 'public'), { extensions: ['html'] })
);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(500).send('Internal Server Error');
});

const server = createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});

interface IClientToServerEvents {
  enterRoom: (nickname: string, roomName: string, callback: () => void) => void;
  createMessage: (
    roomName: string,
    message: string,
    callback: (message: string) => void
  ) => void;
}

interface IServerToClientEvents {
  enterRoom: (nickname: string) => void;
  leaveRoom: (nickname: string) => void;
  createMessage: (nickname: string, message: string) => void;
}

interface IInterServerEvents {}

interface ISocketData {
  nickname: string;
}

const io = new Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  ISocketData
>(server);

io.on('connection', (socket) => {
  console.log(`Connected Socket: ${socket.id}`);

  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });

  socket.on('enterRoom', (nickname, roomName, callback) => {
    socket.data.nickname = nickname;

    socket.join(roomName);

    console.log(socket.rooms);

    callback();

    socket.to(roomName).emit('enterRoom', nickname);
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) => {
      socket
        .to(room)
        .emit('leaveRoom', socket.data.nickname ?? 'Anonymous User');
    });
  });

  socket.on('createMessage', (roomName, message, callback) => {
    if (socket.data.nickname) {
      socket.to(roomName).emit('createMessage', socket.data.nickname, message);

      callback(message);
    }
  });
});
