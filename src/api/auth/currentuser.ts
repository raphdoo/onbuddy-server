import express, { Response, Request } from 'express';
import { currentUser } from '../../../middlewares/current-user';
import { adminUser } from '../../../middlewares/admin-user';

const router = express.Router();

router.get('/currentuser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
