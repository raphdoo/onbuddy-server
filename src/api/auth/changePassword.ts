import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';
import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { body } from 'express-validator';
import { validateRequest } from '../../../middlewares/validate-request';
import { Password } from '../../utils/password';

const router = express.Router();

router.put(
  '/:userId',
  requireAuth,
  [
    body('oldPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters long'),

    body('newPassword')
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
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
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

    const passwordMatch = await Password.compare(user.password, oldPassword);

    if (!passwordMatch) {
      throw new BadRequestError('Please provide a valid credentials');
    }

    user.set({
      password: newPassword,
    });
    await user.save();

    res.status(200).send(user);
  }
);

export { router as changePasswordRouter };
