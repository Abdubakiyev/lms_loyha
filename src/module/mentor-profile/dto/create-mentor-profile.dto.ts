import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMentorProfileDto {
  @ApiProperty({ example: 'Fullstack developer with 5 years experience', description: 'Mentor haqida qisqacha ma\'lumot' })
  @IsString()
  about: string;

  @ApiProperty({ example: 'Senior Backend Developer', description: 'Mentorning kasbi yoki hozirgi lavozimi' })
  @IsString()
  job: string;

  @ApiProperty({ example: 5, description: 'Ish tajribasi (yillarda)' })
  @IsInt()
  experience: number;

  @ApiPropertyOptional({ example: '@mentor_dev', description: 'Telegram username yoki link' })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/mentor', description: 'Instagram profili' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/mentor', description: 'LinkedIn profili' })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/mentor', description: 'Facebook profili' })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({ example: 'https://github.com/mentor', description: 'GitHub profili' })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({ example: 'https://mentor.dev', description: 'Shaxsiy web-sayti' })
  @IsOptional()
  @IsString()
  website?: string;
}
