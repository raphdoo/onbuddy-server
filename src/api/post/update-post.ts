import express, { Request, Response } from "express";
import PostService from "./post.service";

const router = express.Router();

router.patch("/:postId", async (req: Request, res: Response) => {
  const { content } = req.body;
  const user = req.currentUser;
  const data = { content, userId: user?.id } as {
    content: string;
    userId: string;
  };
  const post = await PostService.update(req.params.postId, data);

  res.status(200).send(post);
});

export { router as updatePostRouter };
