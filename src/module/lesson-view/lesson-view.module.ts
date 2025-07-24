import { Module } from '@nestjs/common';
import { LessonViewController } from './lesson-view.controller';
import { LessonViewService } from './lesson-view.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [LessonViewController],
  providers: [LessonViewService,PrismaService]
})
export class LessonViewModule {}
