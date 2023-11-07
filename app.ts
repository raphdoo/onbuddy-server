import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";

// Handling async errors
import "express-async-errors";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import authRouter from "./src/api/auth";
import { currentUser } from "./middlewares/current-user";
import { setCompanyId } from "./middlewares/set-company-id";
import userRouter from "./src/api/user";
import postRouter from "./src/api/post";
import businessRouter from './src/api/company';
// Import routes

const app = express();

app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //we update this line of code later
  })
);

// log request info
app.use(morgan("dev"));

//Authorization Middleware
app.use(currentUser);

//Verifying same Company middleware
app.use(setCompanyId);

// Routes endpoints
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(businessRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('server working');
});

// handling other routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
