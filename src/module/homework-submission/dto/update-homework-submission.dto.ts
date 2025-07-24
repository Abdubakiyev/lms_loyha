import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeworkSubmissionDto } from './create-homework-submission.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { HomeworkSubStatus } from '@prisma/client';

export class UpdateHomeworkSubmissionDto extends PartialType(CreateHomeworkSubmissionDto) {
  @ApiPropertyOptional({ example: 'Updated explanation text' })
  text?: string;

  @ApiPropertyOptional({
    example: '/uploads/homework-submissions/updated-file.pdf',
    description: 'Updated file path',
  })
  file?: string;

  @ApiPropertyOptional({ example: 'Updated reason for submission status' })
  reason?: string;

  @ApiPropertyOptional({
    enum: HomeworkSubStatus,
    example: HomeworkSubStatus.APPROVED,
  })
  status?: HomeworkSubStatus;

  @ApiPropertyOptional({ example: 'uuid-of-homework' })
  homeworkId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-user' })
  userId?: string;
}
