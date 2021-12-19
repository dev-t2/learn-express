import { Document, model, Schema, Types } from 'mongoose';

interface IBlog extends Document {
  user: Types.ObjectId;
  title: string;
  content: string;
}

const schema = new Schema<IBlog>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IBlog>('Blog', schema);
