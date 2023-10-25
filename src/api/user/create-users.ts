import express, { Request, Response } from 'express';
import { requireAuth } from '../../../middlewares/require-auth';
import { adminUser } from '../../../middlewares/admin-user';
import fs from 'fs';
import csv from 'csv-parser';
import { User } from '../../models/user';

const router = express.Router();

export interface payload {
  firstname: string;
  lastname: string;
  email: string;
}

const getRandomPassword = (length: number) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

router.post(
  '/create',
  requireAuth,
  adminUser,
  async (req: Request, res: Response) => {
    const results: payload[] = [];

    fs.createReadStream('src/api/user/Book1.csv')
      .pipe(csv())
      .on('data', (data: payload) => results.push(data))
      .on('end', async () => {
        for (let i = 0; i < results.length; i++) {
          const { firstname, lastname, email } = results[i];
          const userData = { firstname, lastname, email };

          const password = getRandomPassword(7);

          try {
            const user = User.build({
              firstname,
              lastname,
              email,
              password,
              companyId: req.currentUser!.companyId,
            });

            await user.save();
          } catch (error) {
            throw new Error('unable to create users');
          }
        }
        res.status(201).send({ message: 'all users created successfully' });
      });
  }
);

export { router as createUsersRouter };