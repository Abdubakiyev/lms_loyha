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
  
  @Injectable()
  export class AuthService {
    constructor(
        private prisma: PrismaService,
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
      const userExists = await this.prisma.user.findFirst({
        where: { phone: dto.phone },
      });
  
      if (userExists) throw new ConflictException('Phone already registered');
  
      const hashedPassword = await bcrypt.hash(dto.password, 10);
  
      const user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          password: hashedPassword,
        },
      });
  
      const payload = { sub: user.id, phone: user.phone, role: user.role };
      const { accessToken, refreshToken } = this.generateTokens(payload);
  
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });
  
      return {
        message: 'User registered',
        accessToken,
        refreshToken,
      };
    }
  
    async login(dto: LoginDto) {
      const user = await this.prisma.user.findFirst({
        where: { phone: dto.phone },
      });
  
      if (!user) throw new UnauthorizedException('Invalid credentials');
  
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  
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
}
  