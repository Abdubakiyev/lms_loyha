import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateLessonGroupDto, UpdateLessonGroupDto } from './dto/lesson-group.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonGroupService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLessonGroupDto) {
    const data: Prisma.LessonGroupCreateInput = {
      name: dto.name,
      course: {
        connect: {
          id: dto.courseId,
        },
      },
    };
  
    return this.prisma.lessonGroup.create({ data });
  }
  

  findAll(search?: string) {
    return this.prisma.lessonGroup.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.lessonGroup.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateLessonGroupDto) {
    return this.prisma.lessonGroup.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.lessonGroup.delete({ where: { id } });
  }
}
