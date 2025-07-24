import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
  import { CourseService } from './course.service';
  import { CreateCourseDto } from './dto/create-course.dto';
  import { UpdateCourseDto } from './dto/update-course.dto';
  
  @ApiTags('Courses') // Swagger bo‘lim nomi
  @Controller('courses')
  export class CourseController {
    constructor(private readonly courseService: CourseService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new course' })
    @ApiResponse({ status: 201, description: 'Course successfully created' })
    create(@Body() dto: CreateCourseDto) {
      return this.courseService.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all courses' })
    @ApiResponse({ status: 200, description: 'List of courses' })
    findAll() {
      return this.courseService.findAll();
    }
  
    @Get('search')
    @ApiOperation({ summary: 'Search courses by name' })
    @ApiQuery({ name: 'q', required: true, description: 'Search query string' })
    @ApiResponse({ status: 200, description: 'Search result' })
    search(@Query('q') query: string) {
      return this.courseService.search(query);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get course by ID' })
    @ApiParam({ name: 'id', description: 'Course ID (UUID)' })
    @ApiResponse({ status: 200, description: 'Course found' })
    @ApiResponse({ status: 404, description: 'Course not found' })
    findOne(@Param('id') id: string) {
      return this.courseService.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update a course' })
    @ApiParam({ name: 'id', description: 'Course ID (UUID)' })
    @ApiResponse({ status: 200, description: 'Course updated' })
    update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
      return this.courseService.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a course' })
    @ApiParam({ name: 'id', description: 'Course ID (UUID)' })
    @ApiResponse({ status: 200, description: 'Course deleted' })
    remove(@Param('id') id: string) {
      return this.courseService.remove(id);
    }
  }
  