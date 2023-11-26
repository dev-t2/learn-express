import { Router } from 'express';

import { createUser, deleteUser, findUser, findUsers, updateUser } from './users.service';

const UsersController = Router();

UsersController.get('/', findUsers);

UsersController.get('/:id', findUser);

UsersController.post('/', createUser);

UsersController.put('/:id', updateUser);

UsersController.delete('/:id', deleteUser);

export default UsersController;
