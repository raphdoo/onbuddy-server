import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../../../middlewares/validate-request';
import { Roles, User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { Password } from '../../utils/password';

const router = express.Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Please provide password between 4 and 20 characters long'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Please provide a valid credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Please provide a valid credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    res
      .status(200)
      .cookie('session', userJwt, {
        expires: new Date(
          Date.now() +
            parseInt(process.env.COOKIE_EXPIRES_TIME!) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send(existingUser);
  }
);

export { router as signinRouter };
