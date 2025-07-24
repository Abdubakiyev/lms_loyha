import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchasedCourseDto {
  @ApiProperty({ example: 1, description: 'User ID (raqam)' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 10, description: 'Course ID (raqam)' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}
