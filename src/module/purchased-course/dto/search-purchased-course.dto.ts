import { IsOptional, IsNumberString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPurchasedCourseDto {
  @ApiPropertyOptional({ example: '1', description: 'User ID (raqam sifatida satr)' })
  @IsOptional()
  @IsNumberString()
  userId?: string;

  @ApiPropertyOptional({ example: '10', description: 'Course ID (raqam sifatida satr)' })
  @IsOptional()
  @IsNumberString()
  courseId?: string;

  @ApiPropertyOptional({ example: 'React Course', description: 'Kurs nomi bo‘yicha izlash' })
  @IsOptional()
  @IsString()
  title?: string;
}
