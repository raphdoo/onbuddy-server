import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Company } from '../src/models/company';

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

    req.currentUser!.companyId = company.id;
  }
  next();
};
