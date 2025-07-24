import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateHomeworkSubmissionDto } from './dto/create-homework-submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework-submission.dto';

@Injectable()
export class HomeworkSubmissionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateHomeworkSubmissionDto) {
    return this.prisma.homeworkSubmission.create({ data });
  }

  findAll(query?: { userId?: string; homeworkId?: string; status?: string }) {
    return this.prisma.homeworkSubmission.findMany({
      where: {
        userId: query?.userId,
        homeworkId: query?.homeworkId,
        status: query?.status as any,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.homeworkSubmission.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateHomeworkSubmissionDto) {
    return this.prisma.homeworkSubmission.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.homeworkSubmission.delete({ where: { id } });
  }
}
