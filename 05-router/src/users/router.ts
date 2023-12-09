import { Router } from 'express';

import { ICreateUser, IDeleteUser, IFindUser, IUpdateUser } from './interface';
import { createUser, deleteUser, findUser, findUsers, updateUser } from './service';

const UsersRouter = Router();

UsersRouter.get('/', (req, res) => {
  return findUsers(req, res);
});

UsersRouter.post('/', (req: ICreateUser, res) => {
  return createUser(req, res);
});

UsersRouter.get('/:id', (req: IFindUser, res) => {
  return findUser(req, res);
});

UsersRouter.put('/:id', (req: IUpdateUser, res) => {
  return updateUser(req, res);
});

UsersRouter.delete('/:id', (req: IDeleteUser, res) => {
  return deleteUser(req, res);
});

export default UsersRouter;
