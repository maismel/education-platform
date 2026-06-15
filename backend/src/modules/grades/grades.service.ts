import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async assignGrade(
    submissionId: string,
    teacherId: string,
    score: number,
    feedback?: string,
  ) {
    return this.prisma.submission.update({
      where: { id: submissionId },

      data: {
        status: Status.REVIEWED,

        grade: {
          upsert: {
            create: {
              teacherId,
              score,
              feedback,
            },
            update: {
              teacherId,
              score,
              feedback,
            },
          },
        },
      },

      include: {
        grade: true,
      },
    });
  }

  async getGradesForStudent(studentId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: { studentId },
      include: {
        lesson: {
          include: {
            course: true,
          },
        },
      },
    });
    return submissions;
  }

  async getGradesForCourse(courseId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: {
        lesson: {
          courseId,
        },
      },
      include: {
        lesson: true,
        student: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    return submissions;
  }
}
