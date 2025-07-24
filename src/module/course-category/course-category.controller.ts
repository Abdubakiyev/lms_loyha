import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CourseCategoryService } from './course-category.service';
  import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
  import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  
  @Roles(UserRole.ADMIN)
  @ApiTags('Course Categories')
  @ApiBearerAuth()
  @Controller('course-categories')
  export class CourseCategoryController {
    constructor(private readonly service: CourseCategoryService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new course category' })
    create(@Body() dto: CreateCourseCategoryDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all course categories' })
    @ApiQuery({ name: 'search', required: false, description: 'Search by name' })
    findAll(@Query('search') search?: string) {
      return this.service.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a course category by ID' })
    @ApiParam({ name: 'id', type: Number })
    findOne(@Param('id', ParseIntPipe) id: string) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a course category by ID' })
    @ApiParam({ name: 'id', type: Number })
    update(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateCourseCategoryDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a course category by ID' })
    @ApiParam({ name: 'id', type: Number })
    remove(@Param('id', ParseIntPipe) id: string) {
      return this.service.remove(id);
    }
  }
  