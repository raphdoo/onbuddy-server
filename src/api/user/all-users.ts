import express, { Request, Response } from 'express';
import { Roles, User } from '../../models/user';
import { requireAuth } from '../../../middlewares/require-auth';

const router = express.Router();

router.get('/index', requireAuth, async (req: Request, res: Response) => {
  const { keyword, ...filters } = req.query;
  const companyId = req.currentUser!.companyId;

  let queryConditions: any = {
    companyId,
    role: Roles.Employee,
  };

  if (keyword) {
    queryConditions.name = {
      $regex: keyword,
      $options: 'i',
    };
  }

  Object.keys(filters).forEach((key) => {
    queryConditions[key] = filters[key];
  });

  const users = await User.find(queryConditions).exec();
  res.send(users);
});

export { router as userIndexRouter };
