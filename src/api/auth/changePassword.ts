import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';
import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { body } from 'express-validator';
import { validateRequest } from '../../../middlewares/validate-request';

const router = express.Router();

router.put(
  '/:userId',
  requireAuth,
  [
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters long'),

    body('confirmPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters long'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new BadRequestError('Password does not match');
    }

    const user = await User.findOne({
      _id: req.params.userId,
      companyId: req.currentUser!.companyId,
    });

    if (!user) {
      throw new BadRequestError('user not found');
    }

    if (user.id !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (
      JSON.stringify(user.companyId) !==
      JSON.stringify(req.currentUser!.companyId)
    ) {
      throw new NotAuthorizedError();
    }

    user.set({
      password,
    });
    await user.save();

    res.status(200).send(user);
  }
);

export { router as changePasswordRouter };
