import { Module } from '@nestjs/common';
import { LastActivityController } from './last-activity.controller';
import { LastActivityService } from './last-activity.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [LastActivityController],
  providers: [LastActivityService,PrismaService]
})
export class LastActivityModule {}
