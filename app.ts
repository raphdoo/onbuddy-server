import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

// Handling async errors
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { signupRouter } from './src/routes/users/signup';
import { signinRouter } from './src/routes/users/signin';
import { signoutRouter } from './src/routes/users/signout';
import { forgotPasswordRouter } from './src/routes/users/forgotpassword';
import { resetPasswordRouter } from './src/routes/users/resetPassword';

// Import routes

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //we update this line of code later
  })
);

// Routes endpoints
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(forgotPasswordRouter);
app.use(resetPasswordRouter);

// handling other routes
app.all('*', async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
