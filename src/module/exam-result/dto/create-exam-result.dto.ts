import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamResultDto {
  @ApiProperty({ example: 'e1a2b3c4-d5f6-7890-abcd-1234567890ef', description: 'Lesson group ID' })
  @IsString()
  @IsNotEmpty()
  lessonGroupId: string;

  @ApiProperty({ example: 'u1a2b3c4-d5f6-7890-abcd-1234567890ef', description: 'User ID who took the exam' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: true, description: 'Whether the user passed the exam' })
  @IsBoolean()
  passed: boolean;

  @ApiProperty({ example: 8, description: 'Number of correct answers' })
  @IsNumber()
  corrects: number;

  @ApiProperty({ example: 2, description: 'Number of wrong answers' })
  @IsNumber()
  wrongs: number;
}
