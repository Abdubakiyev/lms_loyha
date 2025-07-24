import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email manzilingiz',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Email orqali yuborilgan 6 xonali tasdiqlash kodi',
  })
  @IsString()
  @Length(6)
  code: string;
}
