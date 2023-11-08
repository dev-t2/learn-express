import { model, Schema } from 'mongoose';

import { IUser } from './users.interface';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

UserSchema.virtual('posts', {
  localField: '_id',
  ref: 'Post',
  foreignField: 'user',
});

const User = model<IUser>('User', UserSchema);

export default User;
