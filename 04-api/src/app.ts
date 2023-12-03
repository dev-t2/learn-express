import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

interface IUser {
  id: number;
  nickname: string;
}

const app = express();

const port = 8080;

let users: IUser[] = [];

app.use(morgan('dev'));

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.get('/users', (req, res) => {
  return res.json({ users });
});

interface IRequestFindUser extends Request {
  params: { id: string };
}

app.get('/users/:id', (req: IRequestFindUser, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  return res.json(users[index]);
});

interface IRequestCreateUser extends Request {
  body: { nickname?: string };
}

app.post('/users', (req: IRequestCreateUser, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).send('Bad Request');
  }

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const user: IUser = { id, nickname };

  users = [...users, user];

  return res.status(201).json(user);
});

interface IRequestUpdateUser extends Request {
  params: { id: string };
  body: { nickname?: string };
}

app.put('/users/:id', (req: IRequestUpdateUser, res) => {
  const id = Number(req.params.id);
  const { nickname } = req.body;

  if (isNaN(id) || !nickname) {
    return res.status(400).send('Bad Request');
  }

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  const user = { ...users[index], nickname };

  users[index] = user;

  return res.status(204).json({});
});

interface IRequestDeleteUser extends Request {
  params: { id: string };
}

app.delete('/users/:id', (req: IRequestDeleteUser, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  users = users.filter((user) => user.id !== id);

  return res.status(204).json({});
});

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
