import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateLessonViewDto, UpdateLessonViewDto } from './dto/lesson-view.dto';

@Injectable()
export class LessonViewService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLessonViewDto) {
    return this.prisma.lessonView.create({ data: dto });
  }

  findAll(filter: { lessonId?: string; userId?: string }) {
    return this.prisma.lessonView.findMany({
      where: {
        lessonId: filter.lessonId,
        userId: filter.userId,
      },
    });
  }

  findOne(lessonId: string, userId: string) {
    return this.prisma.lessonView.findUnique({
      where: { lessonId_userId: { lessonId, userId } },
    });
  }

  update(lessonId: string, userId: string, dto: UpdateLessonViewDto) {
    return this.prisma.lessonView.update({
      where: { lessonId_userId: { lessonId, userId } },
      data: dto,
    });
  }

  remove(lessonId: string, userId: string) {
    return this.prisma.lessonView.delete({
      where: { lessonId_userId: { lessonId, userId } },
    });
  }
}
