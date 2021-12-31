import { Request, Response } from 'express';

import { User } from '../model';
import { ICreateUserRequest, IUpdateUserRequest } from './users.interface';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.json({ isSuccess: true, users });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
};

export const getUser = async (req: Request, res: Response) => {
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
};

export const createUser = async (req: ICreateUserRequest, res: Response) => {
  try {
    const { email, nickname } = req.body;

    const user = new User({ email, nickname });

    await user.save();

    res.json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
};

export const updateUser = async (req: IUpdateUserRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { nickname } = req.body;

    const user = await User.findByIdAndUpdate(id, { nickname });

    if (user) {
      res.json({ isSuccess: true });
    } else {
      res.json({ isSuccess: false });
    }
  } catch (err) {
    console.error(err);

    res.json({ isSuccess: false });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
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
};
