import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './lesson.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @ApiPropertyOptional({ example: 'Yangi dars nomi', description: 'Yangi nom (ixtiyoriy)' })
  name?: string;

  @ApiPropertyOptional({ example: 'Yangi dars haqida', description: 'Yangi tavsif (ixtiyoriy)' })
  about?: string;

  @ApiPropertyOptional({ example: 'https://newvideo.com/lesson.mp4', description: 'Yangi video URL (ixtiyoriy)' })
  video?: string;

  @ApiPropertyOptional({ example: 'b9a1db7e-1b0b-4d62-8dd3-0c5e38c3d9b2', description: 'Yangi groupId (UUID)' })
  groupId?: string;

  @ApiPropertyOptional({ example: 'c2bca57e-b1da-4ff7-b0f0-cc33f2d1e5c2', description: 'Yangi courseId (UUID)' })
  courseId?: string;
}
