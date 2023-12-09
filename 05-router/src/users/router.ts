import { Router } from 'express';

import { createUser, deleteUser, findUser, findUsers, updateUser } from './service';

const UsersRouter = Router();

UsersRouter.get('/', findUsers);

UsersRouter.post('/', createUser);

UsersRouter.get('/:id', findUser);

UsersRouter.put('/:id', updateUser);

UsersRouter.delete('/:id', deleteUser);

export default UsersRouter;
