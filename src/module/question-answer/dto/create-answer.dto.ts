import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionAnswerDto {
  @ApiProperty({ example: 'a7e65b1c-ea67-4d67-9ad3-0bd8d055f6b7', description: 'Question ID' })
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @ApiProperty({ example: 'Bu savolga javob', description: 'Javob matni' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Yuklanadigan fayl (ixtiyoriy)' })
  @IsOptional()
  file?: string;
}
