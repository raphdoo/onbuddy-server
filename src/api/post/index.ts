import { Router } from "express";
import { createPostRouter } from "./create-post";
import { getPostsRouter } from "./get-posts";
import { getPostDetailRouter } from "./get-post-detail";
import { likePostRouter } from "./like-post";
import { disLikePostRouter } from "./dislike-post";
import { updatePostRouter } from "./update-post";
import { deletePostRouter } from "./delete-post";
import commentRouter from "../comment";

const postRouter = Router();

postRouter.use(commentRouter);
postRouter.use("/api/v1/post/", postRouter);

postRouter.use(createPostRouter);
postRouter.use(getPostsRouter);
postRouter.use(getPostDetailRouter);
postRouter.use(likePostRouter);
postRouter.use(disLikePostRouter);
postRouter.use(updatePostRouter);
postRouter.use(deletePostRouter);
export default postRouter;
