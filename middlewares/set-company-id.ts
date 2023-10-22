import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Company } from '../src/models/company';
import { User } from '../src/models/user';

export const setCompanyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser) {
    const company = await Company.findOne({ email: req.currentUser!.email });

    if (!company) {
      throw new BadRequestError('Not Found - user company not found');
    }

    const user = await User.findOne({ companyId: company.id });

    if (!user) {
      throw new BadRequestError('Not Found - user not found');
    }

    req.currentUser!.companyId = user.companyId;
  }
  next();
};
