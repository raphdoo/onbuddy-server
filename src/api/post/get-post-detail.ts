import express, { Request, Response } from "express";
import PostService from "./post.service";
import { NotFoundError } from "../../../errors/not-found-error";
import { PostType } from "../../interfaces/post.interface";
import { CommentType } from "../../interfaces/comment.interface";

const router = express.Router();

router.get("/:postId", async (req: Request, res: Response) => {
  const postData = await PostService.get(req.params.postId);

  if (!postData) {
    throw new NotFoundError("Post not Found");
  }

  const { comments, post } = postData;

  res.status(200).json({ post, comments });
});

export { router as getPostDetailRouter };
