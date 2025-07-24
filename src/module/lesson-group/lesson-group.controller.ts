import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { LessonGroupService } from './lesson-group.service';
  import {
    CreateLessonGroupDto,
    UpdateLessonGroupDto,
  } from './dto/lesson-group.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiBody,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  
  @ApiTags('Lesson Groups')
  @ApiBearerAuth()
  @Controller('lesson-groups')
  @UseGuards(RolesGuard)
  export class LessonGroupController {
    constructor(private readonly service: LessonGroupService) {}
  
    @Post()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Yangi lesson group yaratish' })
    @ApiBody({ type: CreateLessonGroupDto })
    create(@Body() dto: CreateLessonGroupDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Barcha lesson group larni olish' })
    @ApiQuery({ name: 'search', required: false, description: 'Qidiruv matni' })
    findAll(@Query('search') search: string) {
      return this.service.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Lesson group ni ID orqali olish' })
    @ApiParam({ name: 'id', description: 'Lesson group IDsi' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Lesson group ni yangilash' })
    @ApiParam({ name: 'id', description: 'Yangilanishi kerak bo‘lgan ID' })
    @ApiBody({ type: UpdateLessonGroupDto })
    update(@Param('id') id: string, @Body() dto: UpdateLessonGroupDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Lesson group ni o‘chirish' })
    @ApiParam({ name: 'id', description: 'O‘chiriladigan lesson group IDsi' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  