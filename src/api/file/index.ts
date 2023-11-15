import { Router } from "express";

import { uploadFileRouter } from "./upload-file";
import { deleteFileRouter } from "./delete-file";

const fileRouter = Router();

fileRouter.use("/api/v1/file/", fileRouter);

fileRouter.use(uploadFileRouter);
fileRouter.use(deleteFileRouter);

export default fileRouter;
