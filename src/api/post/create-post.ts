import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import PostService from "./post.service";

const router = express.Router();

router.post(
  "/create",
  [body("content").notEmpty().withMessage("Please provide a content")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { content } = req.body;
    const currentUser = req.currentUser;
    const data: any = {
      content,
      userId: currentUser?.id,
      companyId: currentUser?.companyId,
    };

    const post = await PostService.create(data);
    res.status(201).json({ post });
  }
);

export { router as createPostRouter };
