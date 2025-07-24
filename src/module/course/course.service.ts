import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCourseDto) {
    const {
      name,
      about,
      price,
      banner,
      introVideo,
      categoryId,
      mentorId,
      level,
    } = dto;
  
    const courseData: any = {
      name,
      about,
      price,
      banner,
      introVideo,
      categoryId,
      level,
    };
  
    if (mentorId !== undefined) {
      courseData.mentorId = mentorId;
    }
  
    return this.prisma.course.create({
      data: courseData,
    });
  }
  
  
  
  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }

  search(query: string) {
    return this.prisma.course.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }
}
