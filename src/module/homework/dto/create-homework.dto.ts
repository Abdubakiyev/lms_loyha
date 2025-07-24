import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @ApiProperty({ example: 'Write an essay about NestJS.' })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiPropertyOptional({ example: 'homeworks/essay1.pdf' })
  @IsOptional()
  @IsString()
  file?: string;

  @ApiProperty({ example: '7fcb9d70-1c0e-4fa6-b1f3-5ec8c4c09a3e' })
  @IsNotEmpty()
  @IsString()
  lessonId: string;
}
