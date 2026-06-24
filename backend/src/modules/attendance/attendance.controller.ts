import { Controller, Post, Param, Req, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in/:lessonId')
  @UseGuards(JwtAuthGuard)
  checkIn(
    @Param('lessonId') lessonId: string,
    @Req() req: { user: { id: string } },
  ) {
    return this.attendanceService.checkIn(req.user.id, lessonId);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMyAttendance(@Req() req: { user: { id: string } }) {
    return this.attendanceService.getMyAttendance(req.user.id);
  }

  @Get('course/:courseId')
  @UseGuards(JwtAuthGuard)
  getCourseAttendance(
    @Param('courseId') courseId: string,
  ) {
    return this.attendanceService.getCourseAttendance(courseId);
  }
}
