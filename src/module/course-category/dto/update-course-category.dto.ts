import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseCategoryDto } from './create-course-category.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseCategoryDto extends PartialType(CreateCourseCategoryDto) {
  @ApiPropertyOptional({
    example: 'Design',
    description: 'Updated name of the course category',
  })
  name?: string;
}
