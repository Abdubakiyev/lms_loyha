import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateQuestionDto, file?: string) {
    return this.prisma.question.create({
      data: {
        ...dto,
        file,
        userId: 'some-user-id', 
      },
    });
  }

  findAll(search?: string) {
    return this.prisma.question.findMany({
      where: search ? { text: { contains: search, mode: 'insensitive' } } : {},
      include: { answer: true, course: true, user: true },
    });
  }

  findOne(id: string) {
    return this.prisma.question.findUnique({ where: { id }, include: { answer: true } });
  }

  update(id: string, dto: UpdateQuestionDto) {
    return this.prisma.question.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}
