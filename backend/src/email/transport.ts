import nodemailer from "nodemailer";
import config from "../config/email";

const transporter = nodemailer.createTransport(config);

transporter.verify((error) => {
  if (error) {
    console.error(error);
    throw new Error("Email configuration error");
  } else {
    console.log("Email configuration is good to go");
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async (emailOptions: EmailOptions): Promise<void> => {
  const emailFields = {
    from: process.env.EMAIL_SENDER as string,
    to: emailOptions.to,
    subject: emailOptions.subject,
    text: emailOptions.text,
  };

  try {
    await transporter.sendMail(emailFields);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
    throw new Error("Email sending failed");
  }
};

export default { sendEmail };
