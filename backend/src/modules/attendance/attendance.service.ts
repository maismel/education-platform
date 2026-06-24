import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceStatus } from '@prisma/client';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkIn(studentId: string, lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const now = new Date();

    if (now < lesson.startsAt || now > lesson.endsAt) {
      throw new BadRequestException(
        'Check-in is only allowed during lesson time',
      );
    }

    const existing = await this.prisma.attendance.findFirst({
      where: {
        lessonId,
        studentId,
      },
    });

    if (existing) {
      throw new BadRequestException('Already checked in');
    }

    return this.prisma.attendance.create({
      data: {
        lessonId,
        studentId,
        status: AttendanceStatus.PRESENT,
      },
      include: {
        lesson: true,
      },
    });
  }

  async getMyAttendance(studentId: string) {
    return this.prisma.attendance.findMany({
      where: { studentId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            startsAt: true,
            endsAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCourseAttendance(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.prisma.attendance.findMany({
      where: {
        lesson: {
          courseId,
        },
      },
    
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
