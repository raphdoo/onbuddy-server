import { Router } from 'express';

import { userIndexRouter } from './all-users';
import { userShowRouter } from './show-user';
import { selfUpdateRouter } from './self-update';
import { adminDeleteRouter } from './delete';
import { adminUpdateRouter } from './admin-update';
import { createUsersRouter } from './create-users';

const userRouter = Router();

userRouter.use('/api/v1/users/', userRouter);

userRouter.use(userIndexRouter);
userRouter.use(userShowRouter);
userRouter.use(selfUpdateRouter);
userRouter.use(adminDeleteRouter);
userRouter.use(adminUpdateRouter);
userRouter.use(createUsersRouter);

export default userRouter;
