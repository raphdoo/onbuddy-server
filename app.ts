import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieSession from "cookie-session";
import rateLimit from "express-rate-limit";

// Handling async errors
import "express-async-errors";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import authRouter from "./src/api/auth";
import { currentUser } from "./middlewares/current-user";
import { setCompanyId } from "./middlewares/set-company-id";
import businessRouter from "./src/api/company";

import userRouter from "./src/api/user";
import postRouter from "./src/api/post";
import fileRouter from "./src/api/file";
import checklistRouter from "./src/api/checklist";

const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.set("trust proxy", true);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     sameSite: 'none',
//   })
// );

app.use(
  cors({
    origin: ["https://onbuddy.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(rateLimiter);

// log request info
app.use(morgan("dev"));

//Authorization Middleware
app.use(currentUser);

// //Verifying same Company middleware
// app.use(setCompanyId);

// Routes endpoints
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(businessRouter);
app.use(postRouter);
app.use(fileRouter);
app.use(checklistRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("server working");
});

// handling other routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
