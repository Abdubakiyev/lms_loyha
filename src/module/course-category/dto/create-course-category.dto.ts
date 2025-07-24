import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategoryDto {
  @ApiProperty({
    example: 'Programming',
    description: 'Name of the course category',
  })
  @IsString()
  name: string;
}
