import { Document, model, Schema, Types } from 'mongoose';

interface IBlog extends Document {
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

export default model<IBlog>('blog', schema);
