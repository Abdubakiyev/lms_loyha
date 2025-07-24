import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { RolesGuard } from 'src/common/core/guards/roles.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@ApiTags('ExamResult') 
@Controller('exam-result')
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create an exam result' })
  @ApiBody({ type: CreateExamResultDto })
  create(@Body() dto: CreateExamResultDto) {
    return this.examResultService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exam results (with optional filters)' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
  @ApiQuery({ name: 'lessonGroupId', required: false, description: 'Filter by lesson group ID' })
  findAll(
    @Query('userId') userId?: string,
    @Query('lessonGroupId') lessonGroupId?: string,
  ) {
    return this.examResultService.findAll({ userId, lessonGroupId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exam result by ID' })
  @ApiParam({ name: 'id', description: 'Exam result ID' })
  findOne(@Param('id') id: string) {
    return this.examResultService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exam result by ID' })
  @ApiParam({ name: 'id', description: 'Exam result ID' })
  remove(@Param('id') id: string) {
    return this.examResultService.remove(id);
  }
}
