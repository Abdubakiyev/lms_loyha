import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService,PrismaService]
})
export class QuestionModule {}
