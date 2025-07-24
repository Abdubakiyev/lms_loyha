import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class PurchasedCourseService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.purchasedCourse.create({ data });
  }

  findAll(search?: string) {
    return this.prisma.purchasedCourse.findMany({
      where: search
        ? {
            course: {
              name: { contains: search, mode: 'insensitive' },
            },
          }
        : undefined,
      include: { course: true, user: true },
    });
  }

  findOne(id: string) {
    return this.prisma.purchasedCourse.findUnique({
      where: { id },
      include: { course: true, user: true },
    });
  }

  update(id: string, data: any) {
    return this.prisma.purchasedCourse.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.purchasedCourse.delete({ where: { id } });
  }
}
