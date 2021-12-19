import { Document, model, Schema, Types } from 'mongoose';

interface IComment extends Document {
  blog: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
}

const schema = new Schema<IComment>(
  {
    blog: { type: Schema.Types.ObjectId, required: true, ref: 'Blog' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>('Comment', schema);
