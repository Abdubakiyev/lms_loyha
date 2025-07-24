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
  import { PurchasedCourseService } from './purchased-course.service';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
  import { CreatePurchasedCourseDto } from './dto/create-purchased-course.dto';
  import { SearchPurchasedCourseDto } from './dto/search-purchased-course.dto';
  
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiTags('PurchasedCourse')
  @Controller('purchased-course')
  export class PurchasedCourseController {
    constructor(private readonly service: PurchasedCourseService) {}
  
    @Post()
    @ApiOperation({ summary: 'Yangi purchased course yaratish' })
    @ApiBody({ type: CreatePurchasedCourseDto })
    create(@Body() body: any) {
      return this.service.create(body);
    }
  
    @Get()
    @ApiOperation({ summary: 'Barcha purchased courselarni olish (search bilan)' })
    @ApiQuery({ name: 'search', required: false, description: 'Qidiruv matni (title, userId, courseId bo‘yicha)' })
    findAll(@Query('search') search?: string) {
      return this.service.findAll(search);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Bitta purchased course olish' })
    @ApiParam({ name: 'id', description: 'PurchasedCourse ID' })
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Purchased course yangilash' })
    @ApiParam({ name: 'id', description: 'PurchasedCourse ID' })
    @ApiBody({ type: CreatePurchasedCourseDto })
    update(@Param('id') id: string, @Body() body: any) {
      return this.service.update(id, body);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Purchased course o‘chirish' })
    @ApiParam({ name: 'id', description: 'PurchasedCourse ID' })
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  