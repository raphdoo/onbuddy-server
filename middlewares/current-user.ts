import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CompanyDoc } from '../src/models/company';
import { User } from '../src/models/user';

interface userPayload {
  id: string;
  email: string;
  companyId: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}

export const currentUser = async (
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

    const user = await User.findById(payload.id);

    req.currentUser = user;
  } catch (err) {}

  next();
};
