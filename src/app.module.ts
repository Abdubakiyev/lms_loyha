import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { UserModule } from './module/user/user.module';
import { MentorProfileModule } from './module/mentor-profile/mentor-profile.module';
import { CourseCategoryModule } from './module/course-category/course-category.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    MentorProfileModule,
    CourseCategoryModule,
    AuthModule,
  ],
})
export class AppModule {}
