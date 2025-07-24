import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutPaymentDto {
  @ApiProperty({
    description: 'Course ID (UUID format)',
    example: 'e7eac2c8-9cf3-4d0d-8bd3-abea73984876',
  })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    description: 'Payment amount in number format',
    example: 49900,
  })
  @IsNumber()
  amount: number;
}
