import express, { Response, Request } from 'express';
import { currentUser } from '../../../middlewares/current-user';

const router = express.Router();

router.get(
  '/api/v1/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
