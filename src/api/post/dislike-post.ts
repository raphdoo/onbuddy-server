import express, { Request, Response } from "express";
import PostService from "./post.service";

const router = express.Router();

router.patch("/:postId/dislike", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const userId: any = req?.currentUser?.id;
  await PostService.disLike(postId, userId);

  res.json({ msg: "post has been disliked" });
});

export { router as disLikePostRouter };
