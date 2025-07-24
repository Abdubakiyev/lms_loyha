import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignedCourseDto {
  @ApiProperty({
    example: 1,
    description: 'Mentorning ID raqami',
  })
  @IsNotEmpty()
  @IsNumber()
  mentorId: number;

  @ApiProperty({
    example: 10,
    description: 'Tayinlanayotgan kursning ID raqami',
  })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}
