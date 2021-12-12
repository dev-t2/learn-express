import { Document, model, Schema, Types } from 'mongoose';

export interface IBlog extends Document {
  userId: Types.ObjectId;
  title: string;
  content: string;
}

const schema = new Schema<IBlog>(
  {
    userId: { ref: 'user', type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = model<IBlog>('blog', schema);
