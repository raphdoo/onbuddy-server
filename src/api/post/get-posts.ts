import express, { Request, Response } from "express";
import PostService from "./post.service";
import { NotFoundError } from "../../../errors/not-found-error";

const router = express.Router();

router.get("/index", async (req: Request, res: Response) => {
  const posts = await PostService.find(req.currentUser?.companyId);

  if (!posts || posts.length === 0) {
    throw new NotFoundError("no user belonging to company id found");
  }
  res.status(200).send(posts);
});

export { router as getPostsRouter };
