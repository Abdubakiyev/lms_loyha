import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto & { image?: string }) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { phone: dto.phone },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Email yoki telefon raqam allaqachon mavjud');
    }

    return this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: dto.password,
        phone: dto.phone,
        image: dto.image,
        
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User topilmadi');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: any = { ...dto };
  
    if (dto.role) {
      data.role = dto.role;
    }
  
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  
  

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}