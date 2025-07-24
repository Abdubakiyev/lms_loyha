import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignedCourseDto } from './create-assigned-course.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAssignedCourseDto extends PartialType(CreateAssignedCourseDto) {
  @ApiPropertyOptional({
    example: 1,
    description: 'Mentorning ID raqami (ixtiyoriy)',
  })
  mentorId?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Kursning ID raqami (ixtiyoriy)',
  })
  courseId?: number;
}
