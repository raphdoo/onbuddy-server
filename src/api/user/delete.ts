import express, { Request, Response } from 'express';
import { Roles, User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';
import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { adminUser } from '../../../middlewares/admin-user';

const router = express.Router();

router.delete(
  '/:userId',
  requireAuth,
  adminUser,
  async (req: Request, res: Response) => {
    const { manager, programTrack, candidateType } = req.body;

    const user = await User.findOne({
      _id: req.params.userId,
      companyId: req.currentUser!.companyId,
    }).populate('company');

    if (!user) {
      throw new BadRequestError('user not found');
    }

    if (user.companyId !== req.currentUser!.companyId) {
      throw new NotAuthorizedError();
    }

    if (user.role === Roles.Admin) {
      throw new BadRequestError('Unable to delete an admin user');
    }

    await User.deleteOne({ _id: user.id });

    res.status(200).send({});
  }
);

export { router as adminDeleteRouter };
