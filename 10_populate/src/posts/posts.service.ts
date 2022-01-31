import { getUser } from '../users/users.service';
import { IPost } from './posts.interface';
import Post from './posts.schema';

export const getPosts = async () => {
  const posts = await Post.find().populate('user');

  return posts;
};

export const getPost = async (id: string) => {
  const post = await Post.findById(id).populate('user');

  if (!post) {
    throw new Error('Post Not Found');
  }

  return post;
};

export const createPost = async (userId: string, { title }: IPost) => {
  const user = await getUser(userId);

  if (!user) {
    throw new Error('User Not Found');
  }

  const post = new Post({ user, title });

  await post.save();

  return post;
};

export const updatePost = async (id: string, { title }: IPost) => {
  const post = await Post.findByIdAndUpdate(id, { title });

  if (!post) {
    throw new Error('Post Not Found');
  }
};

export const deletePosts = async (userId: string) => {
  await Post.deleteMany({ user: userId });
};

export const deletePost = async (id: string) => {
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    throw new Error('Post Not Found');
  }
};
