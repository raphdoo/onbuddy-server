import express, { Request, Response } from "express";
import multer from "multer";
import CloudinaryService from "../../utils/fille.uploader";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/delete",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const publicId = req.params.publicId;
      const cloudinaryService = new CloudinaryService();
      await cloudinaryService.deleteFile(publicId);

      res.json({ message: "File deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export { router as deleteFileRouter };
