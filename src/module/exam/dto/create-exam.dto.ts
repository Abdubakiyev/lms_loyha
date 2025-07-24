import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ExamAnswer } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {
  @ApiProperty({ example: 'What is 2 + 2?', description: 'Savol matni' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ example: '2', description: 'Variant A' })
  @IsString()
  variantA: string;

  @ApiProperty({ example: '3', description: 'Variant B' })
  @IsString()
  variantB: string;

  @ApiProperty({ example: '4', description: 'Variant C' })
  @IsString()
  variantC: string;

  @ApiProperty({ example: '5', description: 'Variant D' })
  @IsString()
  variantD: string;

  @ApiProperty({ enum: ExamAnswer, example: ExamAnswer.variantC, description: 'Togri javob (enum: A, B, C, D)' })
  @IsEnum(ExamAnswer)
  answer: ExamAnswer;

  @ApiProperty({ example: 'cl3ef5x78100012r8hdq23xj9', description: 'LessonGroup ID (UUID)' })
  @IsNotEmpty()
  @IsString()
  lessonGroupId: string;
}
