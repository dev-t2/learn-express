import { deletePosts } from '../posts/posts.service';
import { IUser } from './users.interface';
import User from './users.schema';

export const getUsers = async () => {
  const users = await User.find();

  return users;
};

export const getUser = async (id: string) => {
  const user = await User.findById(id).populate('posts');

  if (!user) {
    throw new Error('User Not Found');
  }

  return user;
};

export const createUser = async ({ email, nickname }: IUser) => {
  const user = new User({ email, nickname });

  await user.save();

  return user;
};

export const updateUser = async (id: string, { nickname }: IUser) => {
  const user = await User.findByIdAndUpdate(id, { nickname });

  if (!user) {
    throw new Error('User Not Found');
  }
};

export const deleteUser = async (id: string) => {
  const [user] = await Promise.all([
    User.findByIdAndDelete(id),
    deletePosts(id),
  ]);

  if (!user) {
    throw new Error('User Not Found');
  }
};
