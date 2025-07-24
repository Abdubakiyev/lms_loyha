import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

import { Prisma } from '@prisma/client';
import { CreateLessonDto } from './dto/lesson.dto';
import { UpdateLessonDto } from './dto/lesson-update.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        name: dto.name,
        about: dto.about,
        video: dto.video,
        group: { connect: { id: dto.groupId } },
        course: { connect: { id: dto.courseId } },
      },
    });
  }

  async findAll(search?: string) {
    return this.prisma.lesson.findMany({
      where: {
        OR: search
          ? [
              { name: { contains: search, mode: 'insensitive' } },
              { about: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: {
        name: dto.name,
        about: dto.about,
        video: dto.video,
        ...(dto.groupId && { group: { connect: { id: dto.groupId } } }),
        ...(dto.courseId && { course: { connect: { id: dto.courseId } } }),
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
