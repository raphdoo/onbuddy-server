import mongoose from "mongoose";
import { PostDoc } from "./post";
import { CompanyDoc } from "./company";
import { UserDoc } from "./user";

// An interface that describes the properties required to create a new user
export interface CommentAttrs {
  content: string;
  userId: UserDoc;
  postId: PostDoc;
}

// An interface that describes the properties that a user model has
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

//An interface that describes the properties that a user document has
interface CommentDoc extends mongoose.Document {
  content: string;
  userId: UserDoc;
  postId: PostDoc;
}

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//adding build method to mongoose userSchema object
CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  CommentSchema
);

const buildComment = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

export { Comment };
