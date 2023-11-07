import { Router } from 'express';

import { updateBusinessProfileRouter } from './update-profile';

const businessRouter = Router();

businessRouter.use('/api/v1/company/', businessRouter);

businessRouter.use(updateBusinessProfileRouter);

export default businessRouter;
