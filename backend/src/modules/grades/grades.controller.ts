import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { Role } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { GradesService } from './grades.service';

import { AssignGradeDto } from './dto/assign-grade.dto';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';

@Controller('grades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Patch('assign')
  @Roles(Role.TEACHER)
  aassignGrade(
    @Body() dto: AssignGradeDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.gradesService.assignGrade(
      dto.submissionId,
      user.id, // teacherId
      dto.score,
      dto.feedback,
    );
  }

  @Get('student/:studentId')
  @Roles(Role.TEACHER, Role.ADMIN)
  getGradesForStudent(@Param('studentId') studentId: string) {
    return this.gradesService.getGradesForStudent(studentId);
  }

  @Get('course/:courseId')
  @Roles(Role.TEACHER, Role.ADMIN)
  getGradesForCourse(@Param('courseId') courseId: string) {
    return this.gradesService.getGradesForCourse(courseId);
  }
}
