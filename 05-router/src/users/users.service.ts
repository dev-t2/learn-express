import { Request, Response } from 'express';

import {
  IRequestCreateUser,
  IRequestDeleteUser,
  IRequestFindUser,
  IRequestUpdateUser,
  IUser,
} from './users.interface';

let users: IUser[] = [];

export const findUserIndex = (id: number) => {
  return users.findIndex((user) => user.id === id);
};

export const findUsers = (req: Request, res: Response) => {
  return res.json({ users });
};

export const findUser = (req: IRequestFindUser, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const index = findUserIndex(id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  return res.json(users[index]);
};

export const createUser = (req: IRequestCreateUser, res: Response) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).send('Bad Request');
  }

  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const user: IUser = { id, nickname };

  users = [...users, user];

  return res.status(201).json(user);
};

export const updateUser = (req: IRequestUpdateUser, res: Response) => {
  const id = Number(req.params.id);
  const { nickname } = req.body;

  if (isNaN(id) || !nickname) {
    return res.status(400).send('Bad Request');
  }

  const index = findUserIndex(id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  const user = { ...users[index], nickname };

  users[index] = user;

  return res.status(204).json({});
};

export const deleteUser = (req: IRequestDeleteUser, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const index = findUserIndex(id);

  if (index < 0) {
    return res.status(404).send('Not Found');
  }

  users = users.filter((user) => user.id !== id);

  return res.status(204).json({});
};
