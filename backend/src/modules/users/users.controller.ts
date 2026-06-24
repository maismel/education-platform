import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CreateTeacherDto } from 'src/modules/users/dto/create-teacher.dto';
import { UpdateProfileDto } from 'src/modules/users/dto/update-profile.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.usersService.getById(req.user.id);
  }

  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:userId/courses')
  @UseGuards(JwtAuthGuard)
  getUserCourses(@Param('userId') userId: string) {
    return this.usersService.getUserCourses(userId);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Patch('me')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const unique = randomUUID();
          const ext = extname(file.originalname);
          cb(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  updateMe(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateProfileDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(user.id, dto, avatar);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('teachers')
  createTeacher(@Body() dto: CreateTeacherDto) {
    return this.usersService.createTeacher(dto);
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deactivateUser(@Param('id') id: string) {
    return this.usersService.deactivateUser(id);
  }
}
