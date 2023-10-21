const nodemailer = require("nodemailer");
import config from "../common/config";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const smtp = config.smtp;

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: {
        user: smtp.email,
        pass: smtp.password,
      },
    });

    const message = {
      from: `${smtp.from_name} <${smtp.from_email}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transport.sendMail(message);
  } catch (err) {
    throw new Error("Error connecting to SMTP");
  }
};
