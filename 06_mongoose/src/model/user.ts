import { model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  username: string;
}

const schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('user', schema);
