import { Router } from "express";
import { addCommentRouter } from "./add-comment";
import { updatePostRouter } from "./update-comment";

const commentRouter = Router();

commentRouter.use("/api/v1/post/", commentRouter);

commentRouter.use(addCommentRouter);
commentRouter.use(updatePostRouter);

export default commentRouter;
