import { IsOptional, IsNumberString, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchAssignedCourseDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'Mentorning ID raqami (string formatda)',
  })
  @IsOptional()
  @IsNumberString()
  mentorId?: string;

  @ApiPropertyOptional({
    example: '10',
    description: 'Kursning ID raqami (string formatda)',
  })
  @IsOptional()
  @IsNumberString()
  courseId?: string;

  @ApiPropertyOptional({
    example: 'Java',
    description: 'Kurs nomi boyicha qidiruv (optional)',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
