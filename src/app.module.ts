import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

import { UserModule } from './module/user/user.module';
import { MentorProfileModule } from './module/mentor-profile/mentor-profile.module';
import { AuthModule } from './module/auth/auth.module';
import { CourseModule } from './module/course/course.module';
import { CourseCategoryModule } from './module/course-category/course-category.module';
import { AssignedCourseModule } from './module/assigned-course/assigned-course.module';
import { PurchasedCourseModule } from './module/purchased-course/purchased-course.module';
import { RatingModule } from './module/rating/rating.module';
import { LastActivityService } from './module/last-activity/last-activity.service';
import { LastActivityModule } from './module/last-activity/last-activity.module';
import { LessonGroupController } from './module/lesson-group/lesson-group.controller';
import { LessonGroupModule } from './module/lesson-group/lesson-group.module';
import { LessonModule } from './module/lesson/lesson.module';
import { LessonViewModule } from './module/lesson-view/lesson-view.module';
import { LessonFileModule } from './module/lesson-file/lesson-file.module';
import { HomeworkModule } from './module/homework/homework.module';
import { HomeworkSubmissionModule } from './module/homework-submission/homework-submission.module';
import { ExamModule } from './module/exam/exam.module';
import { ExamResultModule } from './module/exam-result/exam-result.module';
import { QuestionModule } from './module/question/question.module';
import { QuestionAnswerModule } from './module/question-answer/question-answer.module';
import { PaymentModule } from './module/payment/payment.module';
import { PrismaModule } from './core/database/prisma.module';

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
    MulterModule.register({
      dest: './uploads/homeworks', 
    }),
    PrismaModule,
    UserModule,
    MentorProfileModule,
    AuthModule,
    CourseModule,
    CourseCategoryModule,
    AssignedCourseModule,
    PurchasedCourseModule,
    RatingModule,
    LastActivityModule,
    LessonGroupModule,
    LessonModule,
    LessonViewModule,
    LessonFileModule,
    HomeworkModule,
    HomeworkSubmissionModule,
    ExamModule,
    ExamResultModule,
    QuestionModule,
    QuestionAnswerModule,
    PaymentModule,
  ],
  providers: [LastActivityService],
  controllers: [LessonGroupController],
})
export class AppModule {}
