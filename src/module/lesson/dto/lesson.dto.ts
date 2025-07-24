import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ example: 'Kirish darsi', description: 'Darsning nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Bu darsda LMS tizimi haqida tushuncha beriladi', description: 'Dars haqida qisqacha maʼlumot' })
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty({ example: 'https://videoserver.com/video.mp4', description: 'Darsga tegishli video URL' })
  @IsString()
  @IsNotEmpty()
  video: string;

  @ApiProperty({ example: 'b9a1db7e-1b0b-4d62-8dd3-0c5e38c3d9b2', description: 'Tegishli LessonGroup ID (UUID)' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ example: 'c2bca57e-b1da-4ff7-b0f0-cc33f2d1e5c2', description: 'Tegishli Course ID (UUID)' })
  @IsUUID()
  courseId: string;
}
