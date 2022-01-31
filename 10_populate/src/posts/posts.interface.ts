import { Document, Types } from 'mongoose';

export interface IPost extends Document {
  user: Types.ObjectId;
  title: string;
}
