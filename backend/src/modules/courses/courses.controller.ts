import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CoursesService } from 'src/modules/courses/courses.service';
import { CreateCourseDto } from 'src/modules/courses/dto/createCourse.dto';

import { Role } from '@prisma/client';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UpdateCourseDto } from 'src/modules/courses/dto/updateCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  createCourse(@Body() dto: CreateCourseDto, @Req() req) {
    return this.coursesService.createCourse(dto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCourses() {
    return this.coursesService.getCourses();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.TEACHER)
  getMyCourses(@Req() req) {
    return this.coursesService.getMyCourses(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER)
  updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @Req() req,
  ) {
    return this.coursesService.updateCourse(id, dto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER)
  deleteCourse(@Param('id') id: string, @Req() req) {
    return this.coursesService.deleteCourse(id, req.user.id);
  }

  @Get(':id/students')
  @UseGuards(JwtAuthGuard)
  getCourseStudents(@Param('id') id: string) {
    return this.coursesService.getCourseStudents(id);
  }
}
