import { Module } from '@nestjs/common';
import { QuestionAnswerController } from './question-answer.controller';
import { QuestionAnswerService } from './question-answer.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService,PrismaService]
})
export class QuestionAnswerModule {}
