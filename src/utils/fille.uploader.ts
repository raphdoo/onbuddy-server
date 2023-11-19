import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import config from "../common/config";

const { cloud_name, api_key, api_secret } = config.cloudinary;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as any);
          }
        }
      );

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      bufferStream.pipe(stream);
    });

    return result;
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      // Handle the result if needed
    } catch (error: any) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }
}

export default CloudinaryService;
