import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CourseLevel } from '@prisma/client';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiPropertyOptional({ example: 'Updated TypeScript Bootcamp' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description for the course.' })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional({ example: 99000 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 'https://example.com/updated-banner.jpg' })
  @IsOptional()
  @IsString()
  banner?: string;

  @ApiPropertyOptional({ example: 'https://example.com/updated-intro.mp4' })
  @IsOptional()
  @IsString()
  introVideo?: string;

  @ApiPropertyOptional({ example: 'updated-category-id' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ example: 'updated-mentor-id' })
  @IsOptional()
  @IsString()
  mentorId?: string;

  @ApiPropertyOptional({ enum: CourseLevel, example: CourseLevel.INTERMEDIATE })
  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
