import { model, Schema } from 'mongoose';

import { IUser } from './users.interface';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>('User', UserSchema);

export default User;
