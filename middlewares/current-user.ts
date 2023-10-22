import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CompanyDoc } from '../src/models/company';

interface userPayload {
  id: string;
  email: string;
  companyId: CompanyDoc;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
