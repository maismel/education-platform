import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(studentId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const existing = await this.prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId,
      },
    });

    if (existing) {
      throw new BadRequestException('Already enrolled');
    }

    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }

  async getMyEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        course: {
          isActive: true,
        },
      },
      include: {
        course: {
          include: {
            teacher: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async getCourseStudents(courseId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        courseId,
      },
      include: {
        student: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async unenroll(studentId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        studentId,
        courseId,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    await this.prisma.enrollment.delete({
      where: {
        id: enrollment.id,
      },
    });

    return {
      message: 'Successfully unenrolled',
    };
  }
}
