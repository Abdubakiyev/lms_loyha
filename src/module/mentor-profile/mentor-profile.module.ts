import { Module } from '@nestjs/common';
import { MentorProfileService } from './mentor-profile.service';
import { MentorProfileController } from './mentor-profile.controller';
import { PrismaModule } from 'src/core/database/prisma.module';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/core/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [MentorProfileController],
  providers: [
    MentorProfileService,
    { provide: APP_GUARD, useClass: RolesGuard },     
  ],
})
export class MentorProfileModule {}
