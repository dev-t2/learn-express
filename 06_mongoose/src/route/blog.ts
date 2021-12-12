import { Router } from 'express';

import { User } from '../model/user';
import { Blog, IBlog } from '../model/blog';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { userId, title, content } = req.body as IBlog;

    const user = await User.findById(userId);

    if (user) {
      const blog = new Blog({ userId, title, content });

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
    const { title, content } = req.body as IBlog;

    const blog = await Blog.findByIdAndUpdate(id, { title, content });

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
