import { Module } from '@nestjs/common';
import { HomeworkSubmissionController } from './homework-submission.controller';
import { HomeworkSubmissionService } from './homework-submission.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService,PrismaService]
})
export class HomeworkSubmissionModule {}
