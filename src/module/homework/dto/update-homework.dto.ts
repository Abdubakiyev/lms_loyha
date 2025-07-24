import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeworkDto } from './create-homework.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateHomeworkDto extends PartialType(CreateHomeworkDto) {
  @ApiPropertyOptional({ example: 'Update the essay on NestJS with references.' })
  task?: string;

  @ApiPropertyOptional({ example: 'homeworks/updated_essay.pdf' })
  file?: string;

  @ApiPropertyOptional({ example: '7fcb9d70-1c0e-4fa6-b1f3-5ec8c4c09a3e' })
  lessonId?: string;
}
