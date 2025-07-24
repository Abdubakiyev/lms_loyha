import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateQuestionAnswerDto } from './dto/create-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateQuestionAnswerDto, file?: string) {
    return this.prisma.questionAnswer.create({
      data: {
        ...dto,
        file,
        userId: 'mentor-user-id', // replace with actual user ID
      },
    });
  }

  findOne(id: string) {
    return this.prisma.questionAnswer.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateQuestionAnswerDto) {
    return this.prisma.questionAnswer.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.questionAnswer.delete({ where: { id } });
  }
}
