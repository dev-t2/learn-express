import { Request, Router } from 'express';

import { Blog, Comment, User } from '../model';

const router = Router({ mergeParams: true });

router.post('/', async (req: Request, res) => {
  try {
    const { blogId } = req.params;

    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(req.body.userId),
    ]);

    if (blog && user) {
      const comment = new Comment({ blogId, ...req.body });

      await comment.save();

      res.json({ isSuccess: true, comment });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.get('/', async (req: Request, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blogId });

    res.json({ isSuccess: true, comments });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndUpdate(id, req.body);

    if (comment) {
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

    await Comment.findByIdAndDelete(id);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

export default router;
