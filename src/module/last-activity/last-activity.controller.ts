import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { LastActivityService } from './last-activity.service';
import { CreateLastActivityDto } from './dto/last-activity.create.dto';
import { UpdateLastActivityDto } from './dto/last-activity.update';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('LastActivity')
@Controller('last-activities')
export class LastActivityController {
  constructor(private readonly service: LastActivityService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'Create a last activity' })
  create(@Body() dto: CreateLastActivityDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all last activities with optional filters' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'courseId', required: false })
  findAll(@Query('userId') userId?: string, @Query('courseId') courseId?: string) {
    return this.service.findAll({ userId, courseId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single last activity by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a last activity' })
  update(@Param('id') id: string, @Body() dto: UpdateLastActivityDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a last activity' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
