import { Request, Router } from 'express';

interface IUser {
  id: number;
  nickname: string;
}

let users: IUser[] = [];

interface IRequestFindUser extends Request {
  params: { id: string };
}

interface IRequestCreateUser extends Request {
  body: { nickname?: string };
}

interface IRequestUpdateUser extends Request {
  params: { id: string };
  body: { nickname?: string };
}

interface IRequestDeleteUser extends Request {
  params: { id: string };
}

const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
  return res.json({ users });
});

UsersRouter.get('/:id', (req: IRequestFindUser, res) => {
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

UsersRouter.post('/', (req: IRequestCreateUser, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).send('Bad Request');
  }

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const user: IUser = { id, nickname };

  users = [...users, user];

  return res.status(201).json(user);
});

UsersRouter.put('/:id', (req: IRequestUpdateUser, res) => {
  const id = Number(req.params.id);
  const { nickname } = req.body;

  if (isNaN(id) || !nickname) {
    return res.status(400).send('Bad Request');
  }

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  const user: IUser = { ...users[index], nickname };

  users[index] = user;

  return res.status(204).json({});
});

UsersRouter.delete('/:id', (req: IRequestDeleteUser, res) => {
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

export default UsersRouter;
