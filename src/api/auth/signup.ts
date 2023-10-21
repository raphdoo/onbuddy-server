import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Roles, User } from '../../models/user';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../../errors/bad-request-error';
import { validateRequest } from '../../../middlewares/validate-request';
import { Company } from '../../models/company';

const router = express.Router();

router.post(
  '/signup',
  [
    body('firstname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Firstname must be between 2 and 50 characters long'),
    body('lastname')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Lastname must be between 2 and 50 characters long'),
    body('email').trim().isEmail().withMessage('Email must be valid'),
    body('companyName')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Company Name must be between 3 and 50 characters long'),
    body('pricing')
      .isLength({ min: 3, max: 20 })
      .withMessage(
        'Please provide Pricing plan with characters between 3 and 20'
      ),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstname, lastname, email, password, companyName, pricing } =
      req.body;

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      throw new BadRequestError('Company Email already in use');
    }

    const company = Company.build({
      companyName,
      email,
      pricing,
    });

    await company.save();

    const user = User.build({
      firstname,
      lastname,
      email,
      password,
      companyId: company.id,
      role: Roles.Admin,
    });

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

export { router as signupRouter };
