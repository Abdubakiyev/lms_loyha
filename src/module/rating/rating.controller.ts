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
  } from '@nestjs/common';
  import { RatingService } from './rating.service';
  import { CreateRatingDto } from './dto/create-rating.dto';
  import { UpdateRatingDto } from './dto/update-rating.dto';
  import { SearchRatingDto } from './dto/search-rating.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
  
  @ApiTags('Rating')
  @Controller('rating')
  @UseGuards(RolesGuard)
  export class RatingController {
    constructor(private readonly ratingService: RatingService) {}
  
    @Post()
    @Roles('USER', 'ADMIN')
    @ApiOperation({ summary: 'Yangi reyting yaratish' })
    @ApiResponse({ status: 201, description: 'Reyting muvaffaqiyatli yaratildi' })
    create(@Body() createRatingDto: CreateRatingDto) {
      return this.ratingService.create(createRatingDto);
    }
  
    @Get()
    @Roles('ADMIN', 'USER')
    @ApiOperation({ summary: 'Barcha reytinglarni qidirish' })
    @ApiQuery({ name: 'userId', required: false, description: 'Foydalanuvchi IDsi' })
    @ApiQuery({ name: 'courseId', required: false, description: 'Kurs IDsi' })
    @ApiQuery({ name: 'rate', required: false, description: 'Baholash darajasi (1-5)' })
    @ApiResponse({ status: 200, description: 'Reytinglar roʻyxati' })
    findAll(@Query() query: SearchRatingDto) {
      return this.ratingService.findAll(query);
    }
  
    @Get(':id')
    @Roles('ADMIN', 'USER')
    @ApiOperation({ summary: 'Bitta reytingni olish' })
    @ApiResponse({ status: 200, description: 'Reyting topildi' })
    @ApiResponse({ status: 404, description: 'Reyting topilmadi' })
    findOne(@Param('id') id: string) {
      return this.ratingService.findOne(id);
    }
  
    @Patch(':id')
    @Roles('USER', 'ADMIN')
    @ApiOperation({ summary: 'Reytingni yangilash' })
    @ApiResponse({ status: 200, description: 'Reyting muvaffaqiyatli yangilandi' })
    update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
      return this.ratingService.update(id, updateRatingDto);
    }
  
    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Reytingni o‘chirish (faqat ADMIN)' })
    @ApiResponse({ status: 200, description: 'Reyting muvaffaqiyatli o‘chirildi' })
    remove(@Param('id') id: string) {
      return this.ratingService.remove(id);
    }
  }
  