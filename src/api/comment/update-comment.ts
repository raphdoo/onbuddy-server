import express, { Request, Response } from "express";
import CommentService from "./comment.service";

const router = express.Router();

router.patch("/:commentId/comment", async (req: Request, res: Response) => {
  const { content } = req.body;
  const user = req.currentUser;
  const data = { content, userId: user?.id } as {
    content: string;
    userId: string;
  };
  const post = await CommentService.update(req.params.commentId, data);

  res.status(200).send(post);
});

export { router as updatePostRouter };
