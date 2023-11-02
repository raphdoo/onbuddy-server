import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../../middlewares/validate-request';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { sendEmail } from '../../utils/sendEmail';
import { NotFoundError } from '../../../errors/not-found-error';

const router = express.Router();

router.post(
  '/password/forgot',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError('User with Email provided not found');
    }

    //Get reset token
    const resetToken = user.getPasswordRestToken();

    await user.save({ validateBeforeSave: false });

    //create reset password url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/password/reset/${resetToken}`;

    const message = `Follow the link below to reset your password:\n\n${resetUrl}\n\nIf you have not requested for a change, then ignore this message`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Onbuddy password recovery',
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      throw new Error(
        'An error occurred while sending the forgot password link'
      );
    }
  }
);

export { router as forgotPasswordRouter };
