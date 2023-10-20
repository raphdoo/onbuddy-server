import express from 'express';

const router = express.Router();

router.post('/api/v1/users/signout', (req, res) => {
  req.session = null;

  res.send({ message: 'Signout Successful' });
});

export { router as signoutRouter };
