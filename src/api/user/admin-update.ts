import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';
import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { body } from 'express-validator';
import { validateRequest } from '../../../middlewares/validate-request';
import { adminUser } from '../../../middlewares/admin-user';

const router = express.Router();

router.put(
  '/:userId',
  requireAuth,
  adminUser,
  [
    body('manager')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Manager cannot be empty'),
    body('programTrack')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Manager cannot be empty'),
    body('candidateType')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Manager cannot be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { manager, programTrack, candidateType } = req.body;

    const user = await User.findOne({
      _id: req.params.userId,
      companyId: req.currentUser!.companyId,
    });

    if (!user) {
      throw new BadRequestError('user not found');
    }

    if (
      JSON.stringify(user.companyId) !==
      JSON.stringify(req.currentUser!.companyId)
    ) {
      throw new NotAuthorizedError();
    }

    user.set({
      manager,
      programTrack,
      candidateType,
    });
    await user.save();

    res.status(200).send(user);
  }
);

export { router as adminUpdateRouter };
