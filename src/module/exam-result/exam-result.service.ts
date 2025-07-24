import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';

@Injectable()
export class ExamResultService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateExamResultDto) {
    return this.prisma.examResult.create({ data });
  }

  findAll(query?: { userId?: string; lessonGroupId?: string }) {
    return this.prisma.examResult.findMany({
      where: {
        userId: query?.userId,
        lessonGroupId: query?.lessonGroupId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.examResult.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.examResult.delete({ where: { id } });
  }
}
