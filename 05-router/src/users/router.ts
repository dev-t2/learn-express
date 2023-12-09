import { Router } from 'express';

import { createUser, deleteUser, findUser, findUsers, updateUser } from './service';

const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
  return findUsers(req, res);
});

UsersRouter.post('/', (req, res) => {
  return createUser(req, res);
});

UsersRouter.get('/:id', (req, res) => {
  return findUser(req, res);
});

UsersRouter.put('/:id', (req, res) => {
  return updateUser(req, res);
});

UsersRouter.delete('/:id', (req, res) => {
  return deleteUser(req, res);
});

export default UsersRouter;
