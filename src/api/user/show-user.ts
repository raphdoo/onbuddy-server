import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';

const router = express.Router();

router.get('/:userId', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new BadRequestError('user not found');
  }

  res.status(200).send(user);
});

export { router as userShowRouter };
