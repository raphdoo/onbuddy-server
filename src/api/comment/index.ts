import { Router } from "express";
import { addCommentRouter } from "./add-comment";

const commentRouter = Router();

commentRouter.use("/api/v1/post/", commentRouter);

commentRouter.use(addCommentRouter);

export default commentRouter;
