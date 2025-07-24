import {
    Controller, Post, Body, Get, Param, Patch, Delete,
    UseInterceptors, UploadedFile, UseGuards
  } from '@nestjs/common';
  import { LessonFileService } from './lesson-file.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { CreateLessonFileDto, UpdateLessonFileDto } from './dto/lesson-file.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { ApiBearerAuth, ApiConsumes, ApiBody, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('Lesson Files')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Controller('lesson-files')
  export class LessonFileController {
    constructor(private readonly service: LessonFileService) {}
  
    @Post()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/lesson-files',
        filename: (req, file, cb) => {
          const name = Date.now() + '-' + file.originalname;
          cb(null, name);
        }
      })
    }))
    @ApiOperation({ summary: 'Yangi lesson fayl yaratish (file upload)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          lessonId: { type: 'string', example: 'd83f3fc7-946b-4097-84d3-a33e34c429bd' },
          note: { type: 'string', example: 'Bonus dars uchun material' },
          file: {
            type: 'string',
            format: 'binary'
          }
        },
        required: ['lessonId', 'file']
      }
    })
    async create(
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: CreateLessonFileDto
    ) {
      return this.service.create({ ...dto, file: file.filename });
    }
  
    @Get()
    @ApiOperation({ summary: 'Barcha lesson fayllarni olish' })
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Bitta lesson faylni olish' })
    @ApiParam({ name: 'id', required: true, example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Lesson faylni yangilash' })
    @ApiParam({ name: 'id', required: true, example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
    update(@Param('id') id: string, @Body() dto: UpdateLessonFileDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Lesson faylni o‘chirish' })
    @ApiParam({ name: 'id', required: true, example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  