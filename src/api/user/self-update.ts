import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';
import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { body } from 'express-validator';
import { validateRequest } from '../../../middlewares/validate-request';

const router = express.Router();

router.patch(
  '/:userId',
  requireAuth,
  [
    body('bio')
      .trim()
      .isLength({ min: 5, max: 5000 })
      .withMessage('Please provide bio between 5 and 5000 characters long'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
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
      bio: req.body.bio,
    });
    await user.save();

    res.status(200).send(user);
  }
);

export { router as selfUpdateRouter };
