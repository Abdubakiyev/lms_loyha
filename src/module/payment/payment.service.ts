import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CheckoutPaymentDto } from './dto/checkout-payment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: string, dto: CheckoutPaymentDto) {
    const course = await this.prisma.course.findUnique({
      where: { id: dto.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.prisma.payment.create({
      data: {
        userId,
        courseId: dto.courseId,
        amount: new Prisma.Decimal(dto.amount)
      },
    });
  }
}
