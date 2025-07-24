import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonGroupDto {
  @ApiProperty({ example: '1-bo‘lim: Kirish', description: 'Bo‘lim nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Bu bo‘limda asosiy tushunchalar beriladi.', description: 'Bo‘lim tavsifi' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'e1e8039d-bf7e-4cb7-8cfa-4f294d3c0a17', description: 'Ushbu bo‘lim tegishli bo‘lgan kurs IDsi' })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}

export class UpdateLessonGroupDto {
  @ApiPropertyOptional({ example: 'Yangi nom', description: 'Yangi bo‘lim nomi' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Tavsifi yangilandi', description: 'Yangi tavsif' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'e1e8039d-bf7e-4cb7-8cfa-4f294d3c0a17', description: 'Kurs IDsi (majburiy)' })
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
