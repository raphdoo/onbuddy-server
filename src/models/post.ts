import mongoose from "mongoose";
import { UserDoc } from "./user";
import { CompanyDoc } from "./company";

// An interface that describes the properties required to create a new user
export interface PostAttrs {
  content: string;
  userId: string;
  companyId: string;
  likes?: string[];
}

// An interface that describes the properties that a user model has
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

//An interface that describes the properties that a user document has
export interface PostDoc extends mongoose.Document {
  content: string;
  userId: string;
  companyId: string;
  likes?: string;
}

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

//adding build method to mongoose userSchema object
PostSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", PostSchema);

const buildPost = (attrs: PostAttrs) => {
  return new Post(attrs);
};

export { Post };
