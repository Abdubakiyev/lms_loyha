import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/core/database/prisma.module';
import { MailModule } from 'src/common/mail/mail.module';


@Module({
  imports: [PrismaModule, MailModule], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
