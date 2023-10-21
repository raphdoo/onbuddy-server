import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Company } from '../src/models/company';

export const verifyCompanyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const company = await Company.findOne({ email: req.currentUser!.email });

  if (!company) {
    throw new BadRequestError('Not Authorized - user company not authorized');
  }

  req.currentUser!.companyId = company.id;
  next();
};
