import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post(':courseId')
  enroll(@Param('courseId') courseId: string, @Req() req) {
    return this.enrollmentsService.enroll(req.user.id, courseId);
  }

  @Get('my')
  getMyEnrollments(@Req() req) {
    return this.enrollmentsService.getMyEnrollments(req.user.id);
  }

  @Get('course/:courseId')
  getCourseStudents(@Param('courseId') courseId: string) {
    return this.enrollmentsService.getCourseStudents(courseId);
  }

  @Delete(':courseId')
  unenroll(@Param('courseId') courseId: string, @Req() req) {
    return this.enrollmentsService.unenroll(req.user.id, courseId);
  }
}
