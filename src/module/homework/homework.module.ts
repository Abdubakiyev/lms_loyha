import { Module } from '@nestjs/common';
import { HomeworkController } from './homework.controller';
import { HomeworkService } from './homework.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [HomeworkController],
  providers: [HomeworkService,PrismaService]
})
export class HomeworkModule {}
