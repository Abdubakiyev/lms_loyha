import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: 'Bu kursdagi birinchi savol', description: 'Savol matni' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: '4c9a91c1-dc6e-4f35-a35b-18b7b46e36a9', description: 'Bog‘liq kurs ID si (UUID)' })
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Savolga biriktirilgan fayl (ixtiyoriy)' })
  @IsOptional()
  file?: string;
}
