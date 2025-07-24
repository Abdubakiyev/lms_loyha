import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateLastActivityDto } from './dto/last-activity.create.dto';
import { UpdateLastActivityDto } from './dto/last-activity.update';


@Injectable()
export class LastActivityService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLastActivityDto) {
    return this.prisma.lastActivity.create({ data: dto });
  }

  findAll(filter: { userId?: string; courseId?: string }) {
    return this.prisma.lastActivity.findMany({
      where: {
        userId: filter.userId,
        courseId: filter.courseId,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.lastActivity.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('LastActivity not found');
    return item;
  }

  async update(id: string, dto: UpdateLastActivityDto) {
    return this.prisma.lastActivity.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.lastActivity.delete({ where: { id } });
  }
}
