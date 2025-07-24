import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonViewDto {
  @ApiProperty({ example: 'e1f3c8b2-aaaa-bbbb-cccc-1234567890ab', description: 'Lesson ID' })
  @IsString()
  lessonId: string;

  @ApiProperty({ example: 'f2a4d7e3-bbbb-cccc-dddd-0987654321ef', description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ example: true, description: 'Ko‘rilganlik holati (true yoki false)' })
  @IsBoolean()
  view: boolean;
}

export class UpdateLessonViewDto {
  @ApiProperty({ example: false, description: 'Yangilangan ko‘rish holati' })
  @IsBoolean()
  view: boolean;
}
