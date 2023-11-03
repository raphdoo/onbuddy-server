import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { BadRequestError } from '../../../errors/bad-request-error';
import { requireAuth } from '../../../middlewares/require-auth';
import { NotAuthorizedError } from '../../../errors/not-authorized-error';
import { adminUser } from '../../../middlewares/admin-user';
import { Company } from '../../models/company';

const router = express.Router();

router.put(
  '/profile',
  requireAuth,
  adminUser,
  async (req: Request, res: Response) => {
    const company = await Company.findOne({
      _id: req.currentUser!.companyId,
    });

    if (!company) {
      throw new BadRequestError('company not found');
    }

    if (
      JSON.stringify(company.id) !== JSON.stringify(req.currentUser!.companyId)
    ) {
      throw new NotAuthorizedError();
    }

    if (req.body.ourBusiness) {
      company.set({
        ourBusiness: req.body.ourBusiness,
      });
    }

    if (req.body.ourPurpose) {
      company.set({
        ourPurpose: req.body.ourPurpose,
      });
    }

    if (req.body.ourValues) {
      company.set({
        ourValues: req.body.ourValues,
      });
    }
    if (req.body.diversityStatemet) {
      company.set({
        diversityStatemet: req.body.diversityStatemet,
      });
    }
    if (req.body.diversityStatement_url) {
      company.set({
        diversityStatement_url: req.body.diversityStatement_url,
      });
    }

    await company.save();

    res.status(200).send(company);
  }
);

export { router as updateBusinessProfileRouter };
