import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { SearchRatingDto } from './dto/search-rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRatingDto) {
    return this.prisma.rating.create({
      data: {
        rate: dto.rate,
        comment: dto.comment ?? 'No comment provided',
        userId: dto.userId,
        courseId: dto.courseId,
      },
    });
  }
  

  findAll(query: SearchRatingDto) {
    return this.prisma.rating.findMany({
      where: {
        userId: query.userId,
        courseId: query.courseId,
        rate: query.rate,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.rating.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateRatingDto) {
    return this.prisma.rating.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.rating.delete({ where: { id } });
  }
}
