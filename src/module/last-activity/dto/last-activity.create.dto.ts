import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLastActivityDto {
  @ApiProperty({ example: 'uuid-of-user', description: 'Foydalanuvchi IDsi' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'uuid-of-course', description: 'Kurs IDsi' })
  @IsString()
  courseId: string;

  @ApiProperty({ example: 'video_view', description: 'Faoliyat turi (masalan: video_view, quiz_complete)' })
  @IsString()
  activityType: string;

  @ApiProperty({ example: '{"videoId": "xyz", "duration": 120}', description: 'Faoliyatga oid maʼlumotlar' })
  @IsString()
  activityData: string;
}
