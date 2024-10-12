import { Transporter, createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from '../config';

class EmailService {
  transporter: Transporter;

  constructor() {
    const smtpConfig: SMTPTransport.Options = {
      host: config.NODEMAILER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: config.NODEMAILER_AUTH_USER,
        pass: config.NODEMAILER_AUTH_PASS
      },
      socketTimeout: 30000,
      connectionTimeout: 30000,
      logger: true,
      debug: true
    };

    this.transporter = createTransport(smtpConfig);
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
