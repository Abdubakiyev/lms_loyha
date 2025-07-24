import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateHomeworkDto) {
    return this.prisma.homework.create({ data });
  }

  findAll(query?: { lessonId?: string }) {
    return this.prisma.homework.findMany({
      where: { lessonId: query?.lessonId },
    });
  }

  findOne(id: string) {
    return this.prisma.homework.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateHomeworkDto) {
    return this.prisma.homework.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.homework.delete({ where: { id } });
  }
}
