import { Router } from 'express';

import {
  IRequestCreateUser,
  IRequestDeleteUser,
  IRequestFindUser,
  IRequestUpdateUser,
} from './users.interface';

interface IUser {
  id: number;
  nickname: string;
}

let users: IUser[] = [];

const UsersController = Router();

UsersController.get('/', (req, res) => {
  return res.json({ users });
});

UsersController.get('/:id', (req: IRequestFindUser, res) => {
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

UsersController.post('/', (req: IRequestCreateUser, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).send('Bad Request');
  }

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const user: IUser = { id, nickname };

  users = [...users, user];

  return res.status(201).json(user);
});

UsersController.put('/:id', (req: IRequestUpdateUser, res) => {
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

UsersController.delete('/:id', (req: IRequestDeleteUser, res) => {
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

export default UsersController;
