import express, { Request, Response } from "express";
import PostService from "./post.service";

const router = express.Router();

router.patch("/:postId/like", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId: any = req?.currentUser?.id;
  await PostService.like(postId, userId);

  res.json({ msg: "post has been liked!" });
});

export { router as likePostRouter };
