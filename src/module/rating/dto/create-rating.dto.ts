import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({
    description: 'Foydalanuvchi IDsi (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Kurs IDsi (UUID)',
    example: 'abc12345-def6-7890-gh12-ijklmnopqrst',
  })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiProperty({
    description: 'Baholash darajasi (1 dan 5 gacha)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;

  @ApiProperty({
    description: 'Ixtiyoriy izoh',
    example: 'Kurs juda zo‘r bo‘ldi!',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
