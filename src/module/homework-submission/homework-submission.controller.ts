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
  import { HomeworkSubmissionService } from './homework-submission.service';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from '@prisma/client';
  import { CreateHomeworkSubmissionDto } from './dto/create-homework-submission.dto';
  import { UpdateHomeworkSubmissionDto } from './dto/update-homework-submission.dto';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import {
    ApiTags,
    ApiOperation,
    ApiConsumes,
    ApiBody,
    ApiParam,
    ApiQuery,
    ApiResponse,
  } from '@nestjs/swagger';
  
  @ApiTags('Homework Submissions')
  @Controller('homework-submissions')
  @UseGuards(RolesGuard)
  export class HomeworkSubmissionController {
    constructor(private readonly service: HomeworkSubmissionService) {}
  
    @Post()
    @Roles(UserRole.STUDENT)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Create a homework submission' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Homework submission data with optional file',
      type: CreateHomeworkSubmissionDto,
    })
    @ApiResponse({ status: 201, description: 'Homework submission created' })
    create(
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: CreateHomeworkSubmissionDto,
    ) {
      if (file) {
        dto.file = `/uploads/homeworks/${file.filename}`;
      }
      return this.service.create(dto);
    }
  
    @Get()
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiOperation({ summary: 'Get all homework submissions' })
    @ApiQuery({ name: 'homeworkId', required: false })
    @ApiQuery({ name: 'userId', required: false })
    @ApiQuery({ name: 'status', required: false })
    @ApiResponse({ status: 200, description: 'List of homework submissions' })
    findAll(
      @Query('homeworkId') homeworkId?: string,
      @Query('userId') userId?: string,
      @Query('status') status?: string,
    ) {
      return this.service.findAll({ homeworkId, userId, status });
    }
  
    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
    @ApiOperation({ summary: 'Get homework submission by ID' })
    @ApiParam({ name: 'id', description: 'Homework submission ID' })
    @ApiResponse({ status: 200, description: 'Homework submission found' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Update homework submission by ID' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id', description: 'Homework submission ID' })
    @ApiBody({ type: UpdateHomeworkSubmissionDto })
    @ApiResponse({ status: 200, description: 'Homework submission updated' })
    update(
      @Param('id') id: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: UpdateHomeworkSubmissionDto,
    ) {
      if (file) {
        dto.file = `/uploads/homeworks/${file.filename}`;
      }
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete homework submission by ID' })
    @ApiParam({ name: 'id', description: 'Homework submission ID' })
    @ApiResponse({ status: 200, description: 'Homework submission deleted' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  