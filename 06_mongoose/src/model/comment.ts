import { Document, model, Schema, Types } from 'mongoose';

export interface IComment extends Document {
  blogId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
}

const schema = new Schema<IComment>(
  {
    blogId: { ref: 'blog', type: Schema.Types.ObjectId, required: true },
    userId: { ref: 'user', type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = model<IComment>('comment', schema);
