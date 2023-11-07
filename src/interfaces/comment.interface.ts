import { Schema } from "mongoose";
import { UserDoc } from "../models/user";
import { PostDoc } from "../models/post";

export interface CreateComment {
  content: string;
  userId: string;
  postId: string;
}

export interface CommentType {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId | UserDoc;
  postId: Schema.Types.ObjectId | PostDoc;
  content: string;
}
