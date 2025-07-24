import { PartialType } from '@nestjs/mapped-types';
import { CreateLastActivityDto } from './last-activity.create.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLastActivityDto extends PartialType(CreateLastActivityDto) {
  @ApiPropertyOptional({ example: 'uuid-of-user', description: 'Foydalanuvchi IDsi' })
  userId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-course', description: 'Kurs IDsi' })
  courseId?: string;

  @ApiPropertyOptional({ example: 'video_view', description: 'Faoliyat turi' })
  activityType?: string;

  @ApiPropertyOptional({ example: '{"videoId": "xyz", "duration": 120}', description: 'Faoliyatga oid maʼlumotlar' })
  activityData?: string;
}
