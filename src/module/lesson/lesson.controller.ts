import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { LessonService } from './lesson.service';
  import { UserRole } from '@prisma/client';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { CreateLessonDto } from './dto/lesson.dto';
  import { UpdateLessonDto } from './dto/lesson-update.dto';
  import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('Lesson')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Controller('lesson')
  export class LessonController {
    constructor(private readonly lessonService: LessonService) {}
  
    @Post()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Yangi dars yaratish (faqat ADMIN yoki MENTOR)' })
    create(@Body() dto: CreateLessonDto) {
      return this.lessonService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Barcha darslarni olish (search parametri bilan)' })
    findAll(@Query('search') search?: string) {
      return this.lessonService.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'ID orqali bitta darsni olish' })
    findOne(@Param('id') id: string) {
      return this.lessonService.findOne(id);
    }
  
    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Darsni yangilash (faqat ADMIN yoki MENTOR)' })
    update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
      return this.lessonService.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Darsni ochirish (faqat ADMIN)' })
    remove(@Param('id') id: string) {
      return this.lessonService.remove(id);
    }
  }
  