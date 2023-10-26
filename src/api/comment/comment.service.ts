import { Comment } from "../../models/comment";
import { Post } from "../../models/post";

import { CreateComment } from "../../interfaces/comment.interface";
import { NotAuthorizedError } from "../../../errors/not-authorized-error";
import { NotFoundError } from "../../../errors/not-found-error";

class CommentService {
  static create = async (data: CreateComment) => {
    const post = await Post.findById(data.postId);
    if (!post) throw new NotFoundError();

    const comment = await Comment.create({
      userId: data.userId,
      content: data.content,
      postId: data.postId,
    });
    return comment;
  };

  static update = async (
    commentId: string,
    data: { content: string; userId: string }
  ) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new NotFoundError("comment not found");
    this.canUpdate(comment.userId.id, data.userId);
    const update = await Comment.findByIdAndUpdate(
      commentId,
      { content: data.content },
      { new: true, runValidators: true }
    );
    return update;
  };

  static delete = async (data: { userId: string; commentId: string }) => {
    const comment = await Comment.findById(data.commentId);
    if (!comment) throw new NotFoundError("comment not found!");
    this.canUpdate(comment.userId.id, data.userId);
    return await Post.findByIdAndDelete(data.commentId);
  };

  static canUpdate = (postOwnerId: string, currentUser: string | undefined) => {
    if (postOwnerId.toString() !== currentUser) throw new NotAuthorizedError();
    return true;
  };
}

export default CommentService;
