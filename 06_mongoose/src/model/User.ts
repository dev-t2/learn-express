import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
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

export default model<IUser>('user', schema);
