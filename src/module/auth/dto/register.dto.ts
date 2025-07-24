import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Foydalanuvchining to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Foydalanuvchining telefon raqami',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Kamida 6 ta belgidan iborat parol',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
