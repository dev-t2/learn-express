import { Document, model, Schema, Types } from 'mongoose';

interface IComment extends Document {
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

export default model<IComment>('comment', schema);
