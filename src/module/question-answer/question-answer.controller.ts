import {
    Controller,
    Post,
    Body,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { QuestionAnswerService } from './question-answer.service';
  import { CreateQuestionAnswerDto } from './dto/create-answer.dto';
  import { UpdateQuestionAnswerDto } from './dto/update-answer.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  @ApiTags('Question Answers')
  @ApiBearerAuth()
  @Controller('question-answers')
  @UseGuards(RolesGuard)
  export class QuestionAnswerController {
    constructor(private readonly service: QuestionAnswerService) {}
  
    @Post()
    @Roles(UserRole.MENTOR)
    @ApiOperation({ summary: 'Savolga javob yaratish (mentorlar uchun)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateQuestionAnswerDto })
    @ApiResponse({ status: 201, description: 'Javob muvaffaqiyatli yaratildi' })
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads/question-answers',
          filename: (req, file, cb) => {
            cb(null, `${Date.now()}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    create(
      @Body() body: CreateQuestionAnswerDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      return this.service.create(body, file?.filename);
    }
  
    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
    @ApiOperation({ summary: 'Bitta javobni olish (har kim o‘qiydi)' })
    @ApiResponse({ status: 200, description: 'Javob topildi' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    @Roles(UserRole.MENTOR)
    @ApiOperation({ summary: 'Javobni tahrirlash (mentorlar uchun)' })
    @ApiResponse({ status: 200, description: 'Javob yangilandi' })
    update(@Param('id') id: string, @Body() dto: UpdateQuestionAnswerDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Javobni o‘chirish (adminlar uchun)' })
    @ApiResponse({ status: 200, description: 'Javob o‘chirildi' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  