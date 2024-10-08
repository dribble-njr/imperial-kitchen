import { Transporter, createTransport } from 'nodemailer';
import config from '../config';
class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: config.NODEMAILER_HOST,
      port: config.NODEMAILER_PORT,
      secure: false,
      auth: {
        user: config.NODEMAILER_AUTH_USER,
        pass: config.NODEMAILER_AUTH_PASS
      }
    });
  }
  async sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    try {
      await this.transporter.sendMail({
        from: {
          name: 'kitchen',
          address: config.NODEMAILER_AUTH_USER
        },
        to,
        subject,
        html
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new EmailService();
