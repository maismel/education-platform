import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';

import { LessonsService } from 'src/modules/lessons/lesson.service';
import { CreateLessonDto } from 'src/modules/lessons/dto/createLesson.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UpdateLessonDto } from 'src/modules/lessons/dto/updateLessonDto';
@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER)
  createLesson(@Body() dto: CreateLessonDto, @Req() req) {
    return this.lessonsService.createLesson(dto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getLessons() {
    return this.lessonsService.getLessons();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMyLessons(@Req() req: any) {
    return this.lessonsService.getMyLessons(req.user.id, req.user.role);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getLesson(@Param('id') id: string) {
    return this.lessonsService.getLessonById(id);
  }

  @Get('course/:courseId')
  @UseGuards(JwtAuthGuard)
  getLessonsByCourse(@Param('courseId') courseId: string) {
    return this.lessonsService.getLessonsByCourse(courseId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER)
  updateLesson(
    @Param('id') id: string,
    @Body() dto: UpdateLessonDto,
    @Req() req,
  ) {
    return this.lessonsService.updateLesson(id, dto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER)
  deleteLesson(@Param('id') id: string, @Req() req) {
    return this.lessonsService.deleteLesson(id, req.user.id);
  }
}
