import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Foydalanuvchi email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998901234567', description: 'Foydalanuvchi telefon raqami' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'Foydalanuvchi paroli' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER, description: 'Foydalanuvchi roli' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: 'Ali Valiyev', description: 'To‘liq ism' })
  @IsString()
  fullName: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Profil rasmi URL manzili' })
  @IsOptional()
  image?: string;
}
