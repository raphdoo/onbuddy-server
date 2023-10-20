import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../../middlewares/validate-request';
import { User } from '../../models/user';
import crypto from 'crypto';
import { BadRequestError } from '../../../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/v1/users/password/reset/:token',
  [
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Please provide password between 4 and 20 characters long'),
    body('confirmPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Please provide password between 4 and 20 characters long'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { password, confirmPassword } = req.body;

    //Hash url token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestError(
        'password reset token is invalid or has been expired'
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      throw new BadRequestError('Password does not match');
    }

    //Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    //Store in a session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as resetPasswordRouter };
