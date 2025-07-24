import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService,PrismaService]
})
export class RatingModule {}
