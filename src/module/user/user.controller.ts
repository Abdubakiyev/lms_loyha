import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { UserRole } from 'src/common/enums/user-role.enum';
  import { RolesGuard } from 'src/common/core/guards/roles.guard';
  import { JwtAuthGuard } from 'src/common/core/guards/jwt-auth.guard';
  
  @Controller('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
      return this.userService.create({
        ...createUserDto,
        image: file?.filename,
      });
    }
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(+id);
    }
  }
  