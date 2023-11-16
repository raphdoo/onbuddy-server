import express, { Request, Response } from 'express';
import PostService from './post.service';
import { NotFoundError } from '../../../errors/not-found-error';

const router = express.Router();

router.get('/index', async (req: Request, res: Response) => {
  const posts = await PostService.find(req.currentUser?.companyId);

  if (!posts || posts.length === 0) {
    throw new NotFoundError('no user belonging to company id found');
  }

  const sortedPosts = posts.sort((a, b) => {
    // Sort by the number of likes
    const likesComparison = b.likes!.length - a.likes!.length;

    return likesComparison;
  });
  res.status(200).send(sortedPosts);
});

export { router as getPostsRouter };
