import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateLessonDto } from 'src/modules/lessons/dto/createLesson.dto';
import { UpdateLessonDto } from 'src/modules/lessons/dto/updateLessonDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  private async validateCourseOwnership(courseId: string, teacherId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return course;
  }

  async createLesson(dto: CreateLessonDto, teacherId: string) {
    await this.validateCourseOwnership(dto.courseId, teacherId);

    return this.prisma.lesson.create({
      data: {
        title: dto.title,
        description: dto.description,
        courseId: dto.courseId,
        startsAt: new Date(dto.startsAt),
        endsAt: new Date(dto.endsAt),
      },
    });
  }

  async getLessons() {
    const lessons = await this.prisma.lesson.findMany({
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return lessons;
  }

  async getLessonsByCourse(courseId: string) {
    return this.prisma.lesson.findMany({
      where: {
        courseId,
      },
      orderBy: {
        startsAt: 'asc',
      },
    });
  }

  async getLessonById(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('lesson not found');
    }

    return lesson;
  }

  async updateLesson(
    lessonId: string,
    dto: UpdateLessonDto,
    teacherId: string,
  ) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.course.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.lesson.update({
      where: { id: lessonId },
      data: dto,
    });
  }

  async getMyLessons(userId: string, role: Role) {
    if (role === Role.TEACHER) {
      return this.prisma.lesson.findMany({
        where: {
          course: {
            teacherId: userId,
          },
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          startsAt: 'asc',
        },
      });
    }

    return this.prisma.lesson.findMany({
      where: {
        course: {
          enrollments: {
            some: {
              studentId: userId,
            },
          },
        },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
    });
  }

  async deleteLesson(lessonId: string, teacherId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        course: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.course.teacherId !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });
  }
}
