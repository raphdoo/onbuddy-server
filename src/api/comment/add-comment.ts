import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest } from '../../../middlewares/validate-request';
import CommentService from './comment.service';

const router = express.Router();

router.post(
  '/:postId/comment/create',
  [body('content').notEmpty().withMessage('Please provide a content')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { content } = req.body;
    const currentUser = req.currentUser;
    const data: any = {
      content,
      userId: currentUser?.id,
      postId: req.params.postId,
    };

    const comment = await CommentService.create(data);
    res.status(201).json({ comment });
  }
);

export { router as addCommentRouter };
