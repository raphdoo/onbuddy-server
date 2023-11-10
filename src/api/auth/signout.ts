import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/signout', (req: Request, res: Response) => {
  if (req.session) {
    req.session = null;
  }

  if (req.session == null) {
    res.send({ message: 'Signout Successful' });
  }
});

export { router as signoutRouter };
