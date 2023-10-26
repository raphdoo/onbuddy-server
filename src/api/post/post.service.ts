import { BadRequestError } from "../../../errors/bad-request-error";
import { NotAuthorizedError } from "../../../errors/not-authorized-error";
import { NotFoundError } from "../../../errors/not-found-error";

import { Comment } from "../../models/comment";
import { Company } from "../../models/company";
import { Post, PostAttrs } from "../../models/post";

class PostService {
  static create = async (data: PostAttrs) => {
    const company = await Company.findById(data.companyId);
    if (!company) throw new NotFoundError();
    return await Post.create(data);
  };

  static find = async (companyId: string | undefined) => {
    return await Post.find({ companyId });
  };

  static get = async (id: string) => {
    const [post, comments] = await Promise.all([
      Post.findById(id),
      Comment.find({ postId: id }),
    ]);

    if (!post) return null;

    return { post, comments };
  };

  static like = async (postId: string, userId: string) => {
    const post: any = await Post.findById(postId).populate("likes");
    if (!post) throw new NotFoundError("post not found!");
    const isAlreadyLiked = post?.likes.find((each: any) => each.id === userId);
    if (isAlreadyLiked)
      throw new BadRequestError("This post as already being like already");
    post?.likes.push(userId);
    await post.save();
    return post;
  };

  static disLike = async (postId: string, userId: string) => {
    let post: any = await Post.findById(postId).populate("likes");
    if (!post) throw new NotFoundError("post not found!");
    const isAlreadyLiked = post?.likes.find((each: any) => each.id === userId);
    if (!isAlreadyLiked)
      throw new BadRequestError("This post has not been liked!");
    post.likes = post?.likes.filter((each: any) => each.id !== userId);
    await post.save();
    return post;
  };

  static update = async (
    postId: string,
    data: { content: string; userId: string }
  ) => {
    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError("post not found");
    this.canUpdate(post.userId, data.userId);
    const update = await Post.findByIdAndUpdate(
      postId,
      { content: data.content },
      { new: true, runValidators: true }
    );
    return update;
  };

  static delete = async (data: { userId: string; postId: string }) => {
    const post = await Post.findById(data.postId);
    if (!post) throw new NotFoundError("post not found!");
    this.canUpdate(post.userId, data.userId);
    return await Post.findByIdAndDelete(data.postId);
  };

  static canUpdate = (postOwnerId: string, currentUser: string | undefined) => {
    if (postOwnerId.toString() !== currentUser) throw new NotAuthorizedError();
    return true;
  };
}

export default PostService;
