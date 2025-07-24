import { IsOptional, IsString, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchRatingDto {
  @ApiPropertyOptional({
    description: 'Foydalanuvchi IDsi (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Kurs IDsi (UUID)',
    example: 'abc12345-def6-7890-gh12-ijklmnopqrst',
  })
  @IsOptional()
  @IsString()
  courseId?: string;

  @ApiPropertyOptional({
    description: 'Baholash darajasi (1 dan 5 gacha)',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  rate?: number;
}
