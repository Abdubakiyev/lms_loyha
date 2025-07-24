import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    Get,
    Query,
    Param,
    Patch,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { QuestionService } from './question.service';
  import { CreateQuestionDto } from './dto/create-question.dto';
  import { UpdateQuestionDto } from './dto/update-question.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { extname } from 'path';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import {
    ApiBearerAuth,
    ApiConsumes,
    ApiBody,
    ApiTags,
    ApiOperation,
    ApiResponse,
  } from '@nestjs/swagger';
  
  @ApiTags('Questions')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Controller('questions')
  export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}
  
    @Post()
    @Roles(UserRole.STUDENT)
    @ApiOperation({ summary: 'Savol yaratish (STUDENT)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      type: CreateQuestionDto,
    })
    @ApiResponse({ status: 201, description: 'Savol yaratildi' })
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads/questions',
          filename: (req, file, cb) => {
            cb(null, `${Date.now()}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    create(
      @Body() body: CreateQuestionDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      return this.questionService.create(body, file?.filename);
    }
  
    @Get()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Barcha savollarni olish (ADMIN, MENTOR)' })
    @ApiResponse({ status: 200, description: 'Savollar ro‘yxati' })
    findAll(@Query('search') search: string) {
      return this.questionService.findAll(search);
    }
  
    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
    @ApiOperation({ summary: 'ID orqali savol olish (hamma uchun)' })
    @ApiResponse({ status: 200, description: 'Topilgan savol' })
    findOne(@Param('id') id: string) {
      return this.questionService.findOne(id);
    }
  
    @Patch(':id')
    @Roles(UserRole.MENTOR)
    @ApiOperation({ summary: 'Savolni tahrirlash (MENTOR)' })
    @ApiResponse({ status: 200, description: 'Savol yangilandi' })
    update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
      return this.questionService.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Savolni o‘chirish (ADMIN)' })
    @ApiResponse({ status: 200, description: 'Savol o‘chirildi' })
    remove(@Param('id') id: string) {
      return this.questionService.remove(id);
    }
  }
  