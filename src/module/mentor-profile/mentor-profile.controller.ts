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
    Request,
    ParseIntPipe,
  } from '@nestjs/common';
  import { MentorProfileService } from './mentor-profile.service';
  import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
  import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiTags('Mentor Profiles')
  @ApiBearerAuth()
  @Controller('mentor-profiles')
  export class MentorProfileController {
    constructor(private readonly service: MentorProfileService) {}
  
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @Post()
    @ApiOperation({ summary: 'Create mentor profile (Admin or Mentor only)' })
    create(@Body() dto: CreateMentorProfileDto, @Request() req) {
      const userId = req.user.id;
      return this.service.create(userId, dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all mentor profiles (search optional)' })
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(@Query('search') search?: string) {
      return this.service.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get mentor profile by ID' })
    findOne(@Param('id', ParseIntPipe) id: string) {
      return this.service.findOne(id);
    }
  
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @Patch(':id')
    @ApiOperation({ summary: 'Update mentor profile (Admin or Mentor only)' })
    update(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateMentorProfileDto) {
      return this.service.update(id, dto);
    }
  
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete mentor profile (Admin or Mentor only)' })
    remove(@Param('id', ParseIntPipe) id: string) {
      return this.service.remove(id);
    }
  }
  