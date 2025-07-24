import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { SearchAssignedCourseDto } from './dto/search-assigned-course.dto';

@Injectable()
export class AssignedCourseService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.assignedCourse.create({ data });
  }


  async findAll(query: SearchAssignedCourseDto) {
    const { mentorId, courseId, search } = query;
  
    return this.prisma.assignedCourse.findMany({
      where: {
        ...(mentorId && { mentor: { id: mentorId } }),
        ...(courseId || search
          ? {
              course: {
                ...(courseId && { id: courseId }),
                ...(search && {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                }),
              },
            }
          : {}),
      },
      include: {
        mentor: true,
        course: true,
      },
    });
  }
  
  findOne(id: string) {
    return this.prisma.assignedCourse.findUnique({
      where: { id },
      include: { course: true, user: true },
    });
  }

  update(id: string, data: any) {
    return this.prisma.assignedCourse.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.assignedCourse.delete({ where: { id } });
  }
}
