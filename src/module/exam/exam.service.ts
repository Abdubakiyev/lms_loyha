import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateExamDto) {
    return this.prisma.exam.create({ data });
  }

  findAll(query?: { lessonGroupId?: string }) {
    return this.prisma.exam.findMany({
      where: {
        lessonGroupId: query?.lessonGroupId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.exam.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateExamDto) {
    return this.prisma.exam.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}
