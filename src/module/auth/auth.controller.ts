import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini royxatdan otkazish' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli royxatdan otdi' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kiritish' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Email orqali tasdiqlash kodi yuborilganligini tekshirish' })
  @ApiBody({ type: VerifyCodeDto })
  @ApiResponse({ status: 200, description: 'Kod muvaffaqiyatli tekshirildi' })
  async verifyByCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyCode(dto.email, dto.code);
  }
}
