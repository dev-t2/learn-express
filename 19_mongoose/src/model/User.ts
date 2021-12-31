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

schema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'user',
});

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

export default model<IUser>('User', schema);
