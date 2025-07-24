import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/common/core/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Exam')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create new exam (ADMIN only)' })
  create(@Body() dto: CreateExamDto) {
    return this.examService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exams (optionally by lessonGroupId)' })
  @ApiQuery({ name: 'lessonGroupId', required: false, type: String })
  findAll(@Query('lessonGroupId') lessonGroupId?: string) {
    return this.examService.findAll({ lessonGroupId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one exam by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update exam by ID (ADMIN only)' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() dto: UpdateExamDto) {
    return this.examService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete exam by ID (ADMIN only)' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }
}
