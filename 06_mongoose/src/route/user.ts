import { Router } from 'express';

import { IUser, User } from '../model/user';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json({ isSuccess: true, users });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      res.json({ isSuccess: true, user });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, username } = req.body as IUser;

    const user = new User({ email, username });

    await user.save();

    res.json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body as IUser;

    const user = await User.findByIdAndUpdate(
      id,
      { email, username },
      { new: true }
    );

    if (user) {
      res.json({ isSuccess: true, user });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (user) {
      res.json({ isSuccess: true });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

export default router;
