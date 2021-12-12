import { Router } from 'express';

import { User } from '../model';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

export default router;
