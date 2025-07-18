import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Email tasdiqlash',
      html: `<p>Profilingizni tasdiqlash uchun <a href="${verifyUrl}">havolani bosing</a></p>`,
    });
  }
}
