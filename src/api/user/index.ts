import { Router } from 'express';

import { userIndexRouter } from './all-users';
import { userShowRouter } from './show-user';

const userRouter = Router();

userRouter.use('/api/v1/users/', userRouter);

userRouter.use(userIndexRouter);
userRouter.use(userShowRouter);

export default userRouter;
