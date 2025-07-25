import {
    Injectable,
    UnauthorizedException,
    ConflictException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/core/database/prisma.service';
  import { RegisterDto } from './dto/register.dto';
  import { LoginDto } from './dto/login.dto';
  import * as bcrypt from 'bcryptjs';
  import * as jwt from 'jsonwebtoken';
  import { MailService } from 'src/common/mail/mail.service';
  import { RedisService } from 'src/core/redis/redis.service';
  
  @Injectable()
  export class AuthService {
    constructor(
      private prisma: PrismaService,
      private mailService: MailService,
      private redis: RedisService,
    ) {}
  
    private generateTokens(payload: any) {
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '15m',
      });
  
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {
          expiresIn: '7d',
        },
      );
  
      return { accessToken, refreshToken };
    }
  

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
          where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
        });
      
        if (existingUser) throw new ConflictException('User already exists');
      
        const hashedPassword = await bcrypt.hash(dto.password, 10);
      
        const code = Math.floor(100000 + Math.random() * 900000).toString();
      
        const userData = {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          password: hashedPassword,
        };
        await this.redis.set(`user-data:${dto.email}`, JSON.stringify(userData), 900); 
        await this.redis.set(`verify-code:${dto.email}`, code, 900); 

      
        await this.mailService.sendVerificationCode(dto.email, code);
      
        return { message: 'Tasdiqlash kodi emailingizga yuborildi.' };
    }
      
  
    async login(dto: LoginDto) {
      const user = await this.prisma.user.findFirst({
        where: { phone: dto.phone },
      });
  
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      if (!user.isVerified) {
        throw new UnauthorizedException('Please verify your email first.');
      }
  
      const payload = { sub: user.id, phone: user.phone, role: user.role };
      const { accessToken, refreshToken } = this.generateTokens(payload);
  
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
  
      return {
        message: 'Login successful',
        accessToken,
        refreshToken,
      };
    }
    async verifyCode(email: string, code: string): Promise<{ accessToken: string; refreshToken: string }> {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedCode = code.trim();
    
      const storedCode = await this.redis.get(`verify-code:${normalizedEmail}`);
    
      if (!storedCode || storedCode.trim() !== normalizedCode) {
        throw new UnauthorizedException('Tasdiqlash kodi notogri yoki eskirgan.');
      }
    
      const userDataStr = await this.redis.get(`user-data:${normalizedEmail}`);
      if (!userDataStr) {
        throw new UnauthorizedException('Royxatdan otgan malumot topilmadi.');
      }
    
      const userData = JSON.parse(userDataStr);
    
      const user = await this.prisma.user.create({ data: userData });
    
      await this.redis.del(`verify-code:${normalizedEmail}`);
      await this.redis.del(`user-data:${normalizedEmail}`);
    
      const payload = { sub: user.id, email: user.email, role: user.role };
      const { accessToken, refreshToken } = this.generateTokens(payload);
    
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
    
      return { accessToken, refreshToken };
    }
    
      
}
  