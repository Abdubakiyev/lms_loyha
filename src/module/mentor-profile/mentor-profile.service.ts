import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';

@Injectable()
export class MentorProfileService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateMentorProfileDto) {
    return this.prisma.mentorProfile.create({
      data: { ...dto, userId: userId },
    });
  }

  async findAll(search?: string) {
    return this.prisma.mentorProfile.findMany({
      where: search
        ? {
            OR: [
              { about: { contains: search, mode: 'insensitive' } },
              { job: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {},
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const mentor = await this.prisma.mentorProfile.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!mentor) throw new NotFoundException('Mentor topilmadi');
    return mentor;
  }

  async update(id: string, dto: UpdateMentorProfileDto) {
    return this.prisma.mentorProfile.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.mentorProfile.delete({ where: { id } });
  }
}
