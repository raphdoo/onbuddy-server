import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

// Handling async errors
import "express-async-errors";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import authRouter from "./src/api/auth";
// import { signupRouter } from "./src/api/auth/signup";
// import { signinRouter } from "./src/api/auth/signin";
// import { signoutRouter } from "./src/api/auth/signout";
// import { forgotPasswordRouter } from "./src/api/auth/forgotpassword";
// import { resetPasswordRouter } from "./src/api/auth/resetPassword";
// import { currentUserRouter } from "./src/api/auth/currentuser";
import { currentUser } from "./middlewares/current-user";

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

//Authorization Middleware
app.use(currentUser);

// Routes endpoints
app.use(authRouter);

// handling other routes
app.all("*", async () => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };
