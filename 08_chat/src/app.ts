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

interface IEnterRoom {
  name: string;
}

interface IClientToServerEvents {
  enterRoom: (data: IEnterRoom) => void;
}

interface IServerToClientEvents {}

interface IInterServerEvents {}

interface ISocketData {}

const io = new Server<
  IClientToServerEvents,
  IServerToClientEvents,
  IInterServerEvents,
  ISocketData
>(server);

io.on('connection', (socket) => {
  socket.on('enterRoom', ({ name }) => {
    console.log(name);
  });
});
