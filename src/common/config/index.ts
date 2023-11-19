import { config as envConfig } from 'dotenv';

envConfig();

type SmtpConfig = {
  port: string;
  host: string;
  email: string;
  password: string;
  from_name: string;
  from_email: string;
};

type CloudinaryConfig = {
  cloud_name: string;
  api_key: string;
  api_secret: string;
};

// Define the overall configuration type
type AppConfig = {
  JWT: string;
  smtp: SmtpConfig;
  db: {
    url: string;
  };
  app: {
    port: any;
  };
  cloudinary: CloudinaryConfig;
};

export default {
  JWT: process.env.JWT_KEY,
  smtp: {
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    email: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
    from_name: process.env.SMTP_FROM_NAME,
    from_email: process.env.SMTP_FROM_EMAIL,
  },

  db: {
    url: process.env.DB_URL,
  },
  app: {
    port: process.env.PORT,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  },
} as AppConfig;
