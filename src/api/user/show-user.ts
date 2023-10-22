import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';

const router = express.Router();

router.get('/:userId', requireAuth, async (req: Request, res: Response) => {
  const user = await User.findOne({
    _id: req.params.userId,
    companyId: req.currentUser!.companyId,
  });

  if (!user) {
    throw new BadRequestError('user not found');
  }

  res.status(200).send(user);
});

export { router as userShowRouter };
