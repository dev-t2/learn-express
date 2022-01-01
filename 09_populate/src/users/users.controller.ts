import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './users.service';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await getUsers();

    res.json({ isSuccess: true, users });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUser(id);

    res.json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await updateUser(id, req.body);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await deleteUser(id);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

export default usersRouter;
