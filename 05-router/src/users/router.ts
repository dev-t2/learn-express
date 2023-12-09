import { Router } from 'express';

import {
  IRequestCreateUser,
  IRequestDeleteUser,
  IRequestFindUser,
  IRequestUpdateUser,
  IUser,
} from './interface';

let users: IUser[] = [];

const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
  return res.json({ users });
});

UsersRouter.get('/:id', (req: IRequestFindUser, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const findUser = users.find((user) => user.id === id);

  if (!findUser) {
    return res.status(404).send('Not Found');
  }

  return res.json(findUser);
});

UsersRouter.post('/', (req: IRequestCreateUser, res) => {
  const nickname = req.body.nickname?.trim();

  if (!nickname) {
    return res.status(400).send('Bad Request');
  }

  const isExistsNickname = users.find((user) => user.nickname === nickname);

  if (isExistsNickname) {
    return res.status(400).send('Bad Request');
  }

  const id = users.length ? users[users.length - 1].id + 1 : 1;

  const user: IUser = { id, nickname };

  users = [...users, user];

  return res.status(201).json(user);
});

UsersRouter.put('/:id', (req: IRequestUpdateUser, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const nickname = req.body.nickname?.trim();

  if (!nickname) {
    return res.status(400).send('Bad Request');
  }

  const isExistsNickname = users.find((user) => user.nickname === nickname);

  if (isExistsNickname) {
    return res.status(400).send('Bad Request');
  }

  const findUser = users.find((user) => user.id === id);

  if (!findUser) {
    return res.status(404).send('Not Found');
  }

  users = users.map((user) => {
    return user.id === findUser.id ? { ...user, nickname } : user;
  });

  return res.status(204).json({});
});

UsersRouter.delete('/:id', (req: IRequestDeleteUser, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const findUser = users.find((user) => user.id === id);

  if (!findUser) {
    return res.status(404).send('Not Found');
  }

  users = users.filter((user) => user.id !== findUser.id);

  return res.status(204).json({});
});

export default UsersRouter;
