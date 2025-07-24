import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HomeworkSubStatus } from '@prisma/client';

export class CreateHomeworkSubmissionDto {
  @ApiPropertyOptional({ example: 'Homework explanation or notes' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    example: '/uploads/homework-submissions/filename.pdf',
    description: 'Path to uploaded file',
  })
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiPropertyOptional({ example: 'The reason for submission delay or status' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    enum: HomeworkSubStatus,
    example: HomeworkSubStatus.PENDING,
  })
  @IsOptional()
  status?: HomeworkSubStatus;

  @ApiProperty({ example: 'uuid-of-homework' })
  @IsNotEmpty()
  @IsString()
  homeworkId: string;

  @ApiProperty({ example: 'uuid-of-user' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
