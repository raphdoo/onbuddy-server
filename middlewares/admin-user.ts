import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { Roles, User } from '../src/models/user';
import { BadRequestError } from '../errors/bad-request-error';

export const adminUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminUser = await User.findById(req.currentUser!.id);

  if (adminUser!.role !== Roles.Admin) {
    throw new BadRequestError('Not Authorized - Admin right required');
  }

  next();
};
