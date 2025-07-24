import {
    Controller, Post, Body, Get, Param, Patch, Delete, Query, UseGuards
  } from '@nestjs/common';
  import { LessonViewService } from './lesson-view.service';
  import { CreateLessonViewDto, UpdateLessonViewDto } from './dto/lesson-view.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
  
  @ApiTags('Lesson Views')
  @Controller('lesson-views')
  @UseGuards(RolesGuard)
  export class LessonViewController {
    constructor(private readonly service: LessonViewService) {}
  
    @Post()
    @Roles(UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN)
    @ApiOperation({ summary: 'Create lesson view' })
    @ApiBody({ type: CreateLessonViewDto })
    create(@Body() dto: CreateLessonViewDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all lesson views (with optional filters)' })
    @ApiQuery({ name: 'lessonId', required: false, description: 'Filter by lesson ID' })
    @ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
    findAll(
      @Query('lessonId') lessonId?: string,
      @Query('userId') userId?: string
    ) {
      return this.service.findAll({ lessonId, userId });
    }
  
    @Get(':lessonId/:userId')
    @ApiOperation({ summary: 'Get a lesson view by lessonId and userId' })
    @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    findOne(@Param('lessonId') lessonId: string, @Param('userId') userId: string) {
      return this.service.findOne(lessonId, userId);
    }
  
    @Patch(':lessonId/:userId')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Update view status for a lesson by lessonId and userId' })
    @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    @ApiBody({ type: UpdateLessonViewDto })
    update(
      @Param('lessonId') lessonId: string,
      @Param('userId') userId: string,
      @Body() dto: UpdateLessonViewDto
    ) {
      return this.service.update(lessonId, userId, dto);
    }
  
    @Delete(':lessonId/:userId')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete a lesson view by lessonId and userId' })
    @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
    @ApiParam({ name: 'userId', description: 'User ID' })
    remove(@Param('lessonId') lessonId: string, @Param('userId') userId: string) {
      return this.service.remove(lessonId, userId);
    }
  }
  