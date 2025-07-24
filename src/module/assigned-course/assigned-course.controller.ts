import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { AssignedCourseService } from './assigned-course.service';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { CreateAssignedCourseDto } from './dto/create-assigned-course.dto';
  import { UpdateAssignedCourseDto } from './dto/update-assigned-course.dto';
  import { SearchAssignedCourseDto } from './dto/search-assigned-course.dto';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiQuery,
    ApiParam,
  } from '@nestjs/swagger';
  
  @ApiTags('AssignedCourse')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Controller('assigned-course')
  export class AssignedCourseController {
    constructor(private readonly service: AssignedCourseService) {}
  
    @Post()
    @ApiOperation({ summary: 'Assign course to mentor' })
    @ApiResponse({ status: 201, description: 'Assigned course created' })
    @ApiBody({ type: CreateAssignedCourseDto })
    create(@Body() body: CreateAssignedCourseDto) {
      return this.service.create(body);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all assigned courses' })
    @ApiQuery({ name: 'mentorId', required: false, type: String })
    @ApiQuery({ name: 'courseId', required: false, type: String })
    findAll(@Query() search: SearchAssignedCourseDto) {
      return this.service.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get one assigned course by ID' })
    @ApiParam({ name: 'id', type: String })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update assigned course by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateAssignedCourseDto })
    update(@Param('id') id: string, @Body() body: UpdateAssignedCourseDto) {
      return this.service.update(id, body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete assigned course by ID' })
    @ApiParam({ name: 'id', type: String })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  