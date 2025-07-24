import {
    IsNotEmpty,
    IsOptional,
    IsEnum,
    IsString,
    IsNumber,
    IsBoolean,
  } from 'class-validator';
  import { CourseLevel } from '@prisma/client';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  export class CreateCourseDto {
    @ApiProperty({ example: 'TypeScript Bootcamp' })
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'Learn TypeScript from scratch with hands-on examples.' })
    @IsNotEmpty()
    @IsString()
    about: string;
  
    @ApiProperty({ example: 199000 })
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @ApiProperty({ example: 'https://example.com/banner.jpg' })
    @IsNotEmpty()
    @IsString()
    banner: string;
  
    @ApiPropertyOptional({ example: 'https://example.com/intro.mp4' })
    @IsOptional()
    @IsString()
    introVideo?: string;
  
    @ApiProperty({ example: 'category-uuid' })
    @IsNotEmpty()
    @IsString()
    categoryId: string;
  
    @ApiPropertyOptional({ example: 'mentor-uuid' })
    @IsOptional()
    @IsString()
    mentorId?: string;
  
    @ApiPropertyOptional({ enum: CourseLevel, example: CourseLevel.BEGINNER })
    @IsOptional()
    @IsEnum(CourseLevel)
    level?: CourseLevel;
  
    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean;
  }
  