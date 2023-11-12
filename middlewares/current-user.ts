import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CompanyDoc } from '../src/models/company';

interface userPayload {
  id: string;
  email: string;
  companyId: string;
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
  if (!req.cookies.session) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.cookies.session,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
