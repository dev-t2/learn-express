import { Router } from 'express';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from './posts.service';

const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await getPosts();

    res.json({ isSuccess: true, posts });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

postsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await getPost(id);

    res.json({ isSuccess: true, post });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

postsRouter.post('/', async (req, res) => {
  try {
    const post = await createPost(req.body);

    res.json({ isSuccess: true, post });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

postsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await updatePost(id, req.body);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

postsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await deletePost(id);

    res.json({ isSuccess: true });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
});

export default postsRouter;
