import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  nickname: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    nickname: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>('User', UserSchema);

export default User;
