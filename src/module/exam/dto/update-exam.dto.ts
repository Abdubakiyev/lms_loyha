import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDto } from './create-exam.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExamAnswer } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateExamDto extends PartialType(CreateExamDto) {
  @ApiPropertyOptional({ type: String, example: 'What is 2+2?' })
  @IsOptional()
  @IsString()
  question?: string;

  @ApiPropertyOptional({ type: String, example: '2' })
  @IsOptional()
  @IsString()
  variantA?: string;

  @ApiPropertyOptional({ type: String, example: '3' })
  @IsOptional()
  @IsString()
  variantB?: string;

  @ApiPropertyOptional({ type: String, example: '4' })
  @IsOptional()
  @IsString()
  variantC?: string;

  @ApiPropertyOptional({ type: String, example: '5' })
  @IsOptional()
  @IsString()
  variantD?: string;

  @ApiPropertyOptional({ enum: ExamAnswer, example: ExamAnswer.variantC})
  @IsOptional()
  @IsEnum(ExamAnswer)
  answer?: ExamAnswer;

  @ApiPropertyOptional({ type: String, example: 'lesson-group-uuid' })
  @IsOptional()
  @IsString()
  lessonGroupId?: string;
}
