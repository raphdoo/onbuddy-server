import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';

const router = express.Router();

router.get('/index', async (req: Request, res: Response) => {
  const users = await User.find({ companyId: req.currentUser!.companyId });

  if (!users) {
    throw new BadRequestError('no user belonging to company id found');
  }

  res.status(200).send(users);
});

export { router as userIndexRouter };
