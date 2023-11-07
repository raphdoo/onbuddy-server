import express, { Request, Response } from "express";
import PostService from "./post.service";

const router = express.Router();

router.delete("/:postId", async (req: Request, res: Response) => {
  const user = req.currentUser;
  const data = { userId: user?.id, postId: req.params.postId } as {
    userId: string;
    postId: string;
  };
  await PostService.delete(data);

  res.json({ msg: "Post deleted!" });
});

export { router as deletePostRouter };
