import { model, Schema } from 'mongoose';

import { IPost } from './posts.interface';

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = model<IPost>('Post', PostSchema);

export default Post;
