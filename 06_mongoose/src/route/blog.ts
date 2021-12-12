import { Router } from 'express';

import { Blog, User } from '../model';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (user) {
      const blog = new Blog(req.body);

      await blog.save();

      res.json({ isSuccess: true, blog });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json({ isSuccess: true, blogs });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (blog) {
      res.json({ isSuccess: true, blog });
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

    const blog = await Blog.findByIdAndUpdate(id, req.body);

    if (blog) {
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

    await Blog.findByIdAndDelete(id);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

export default router;
