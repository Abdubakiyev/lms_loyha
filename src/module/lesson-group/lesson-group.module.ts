import { Module } from '@nestjs/common';
import { LessonGroupService } from './lesson-group.service';
import { LessonGroupController } from './lesson-group.controller';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers:[LessonGroupController],
  providers: [LessonGroupService,PrismaService],
  exports:[LessonGroupService]
})
export class LessonGroupModule {}
