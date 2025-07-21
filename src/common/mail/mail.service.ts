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

  async sendVerificationCode(email: string, code: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Email tasdiqlash kodi',
      html: `<p>Tasdiqlash kodingiz: <b>${code}</b></p>
             <p>Bu kod 15 daqiqa davomida amal qiladi.</p>`,
    });
  }
}
