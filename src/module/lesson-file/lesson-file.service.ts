import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateLessonFileDto, UpdateLessonFileDto } from './dto/lesson-file.dto';

@Injectable()
export class LessonFileService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLessonFileDto) {
    return this.prisma.lessonFile.create({ data: dto });
  }

  findAll() {
    return this.prisma.lessonFile.findMany();
  }

  findOne(id: string) {
    return this.prisma.lessonFile.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateLessonFileDto) {
    return this.prisma.lessonFile.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.lessonFile.delete({ where: { id } });
  }
}
