import express, { Request, Response } from "express";
import multer from "multer";
import CloudinaryService from "../../utils/fille.uploader";
import { BadRequestError } from "../../../errors/bad-request-error";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) throw new BadRequestError("upload a valid file");
      const cloudinaryService = new CloudinaryService();
      const { secure_url } = await cloudinaryService.uploadFile(req.file);

      res.json({ secure_url });
    } catch (error: any) {
      console.log(error);
      throw new BadRequestError(
        `An Error occur while uploading files ${error.message}`
      );
    }
  }
);

export { router as uploadFileRouter };
