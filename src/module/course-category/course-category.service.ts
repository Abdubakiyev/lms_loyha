import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCourseCategoryDto) {
    return this.prisma.courseCategory.create({ data: dto });
  }

  findAll(search?: string) {
    return this.prisma.courseCategory.findMany({
      where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.courseCategory.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateCourseCategoryDto) {
    return this.prisma.courseCategory.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.courseCategory.delete({ where: { id } });
  }
}
