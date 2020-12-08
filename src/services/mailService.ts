import NodeMailer, { Transporter } from "nodemailer";
import { mailUsername, mailPassword,mailService } from "../config";


function mailTransporter(): Transporter {
  const transporter = NodeMailer.createTransport({
    service: mailService,
    port: 587,
    auth: { user: mailUsername, pass: mailPassword },
  });
  return transporter;
}

export default mailTransporter;
