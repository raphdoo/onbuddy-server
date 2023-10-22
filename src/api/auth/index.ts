import { Router } from 'express';

import { currentUserRouter } from './currentuser';
import { forgotPasswordRouter } from './forgotpassword';
import { resetPasswordRouter } from './resetPassword';
import { signinRouter } from './signin';
import { signoutRouter } from './signout';
import { signupRouter } from './signup';
import { changePasswordRouter } from './changePassword';

const authRouter = Router();

authRouter.use('/api/v1/auth/', authRouter);

authRouter.use(currentUserRouter);
authRouter.use(forgotPasswordRouter);
authRouter.use(signinRouter);
authRouter.use(signoutRouter);
authRouter.use(signupRouter);
authRouter.use(resetPasswordRouter);
authRouter.use(changePasswordRouter);

export default authRouter;
