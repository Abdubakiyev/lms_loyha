import {
    Controller,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Get,
    Query,
    UploadedFile,
    UseInterceptors,
    UseGuards,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { HomeworkService } from './homework.service';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { CreateHomeworkDto } from './dto/create-homework.dto';
  import { UpdateHomeworkDto } from './dto/update-homework.dto';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  @ApiTags('Homeworks')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Controller('homeworks')
  export class HomeworkController {
    constructor(private readonly service: HomeworkService) {}
  
    @Post()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Create homework (with optional file upload)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          task: { type: 'string', example: 'Write a short essay on HTTP' },
          lessonId: {
            type: 'string',
            example: '7fcb9d70-1c0e-4fa6-b1f3-5ec8c4c09a3e',
          },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
        required: ['task', 'lessonId'],
      },
    })
    create(
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: CreateHomeworkDto,
    ) {
      if (file) {
        dto.file = `/uploads/homeworks/${file.filename}`;
      }
      return this.service.create(dto);
    }
  
    @Get()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Get all homeworks (optionally by lessonId)' })
    @ApiQuery({ name: 'lessonId', required: false })
    findAll(@Query('lessonId') lessonId?: string) {
      return this.service.findAll({ lessonId });
    }
  
    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Get single homework by ID' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Update homework (optionally with new file)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          task: { type: 'string', example: 'Updated essay task' },
          lessonId: {
            type: 'string',
            example: '7fcb9d70-1c0e-4fa6-b1f3-5ec8c4c09a3e',
          },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    update(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: UpdateHomeworkDto,
    ) {
      if (file) {
        dto.file = `/uploads/homeworks/${file.filename}`;
      }
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete homework by ID' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  