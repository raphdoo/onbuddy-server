import express, { Request, Response } from "express";

import CommentService from "./comment.service";

const router = express.Router();

router.delete("/comment/:commentId", async (req: Request, res: Response) => {
  const user = req.currentUser;
  const data = { userId: user?.id, commentId: req.params.commentId } as {
    userId: string;
    commentId: string;
  };
  await CommentService.delete(data);

  res.json({ msg: "Post deleted!" });
});

export { router as deletePostRouter };
