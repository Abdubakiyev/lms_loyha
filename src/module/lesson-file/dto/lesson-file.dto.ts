import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonFileDto {
  @ApiProperty({ example: 'c1a9e3fa-56b4-4aa6-bf85-a0f6c3d8d740', description: 'Bogʻlanadigan dars IDsi' })
  @IsString()
  lessonId: string;

  @ApiProperty({ example: 'https://cdn.site.com/lesson-files/video.mp4', description: 'Yuklangan fayl URL manzili yoki fayl nomi' })
  @IsString()
  file: string;

  @ApiPropertyOptional({ example: 'Bu fayl bonus darsga tegishli', description: 'Fayl haqida izoh' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class UpdateLessonFileDto {
  @ApiPropertyOptional({ example: 'Yangi versiyasi yuklandi', description: 'Fayl haqida yangilangan izoh' })
  @IsOptional()
  @IsString()
  note?: string;
}
