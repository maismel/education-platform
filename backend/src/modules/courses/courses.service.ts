import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from 'src/modules/courses/dto/createCourse.dto';
import { UpdateCourseDto } from 'src/modules/courses/dto/updateCourse.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // create course
  async createCourse(dto: CreateCourseDto, teacherId: string) {
    const course = await this.prisma.course.create({
      data: {
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        teacherId,
      },
    });

    return course;
  }

  async getCourses() {
    return this.prisma.course.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async getMyCourses(teacherId: string) {
    return this.prisma.course.findMany({
      where: {
        teacherId,
      },
      include: {
        teacher: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async getCourseById(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        teacher: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async updateCourse(
    courseId: string,
    dto: UpdateCourseDto,
    teacherId: string,
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.teacherId !== teacherId) {
      throw new ForbiddenException();
    }

    return this.prisma.course.update({
      where: { id: courseId },
      data: dto,
    });
  }

  async deleteCourse(courseId: string, teacherId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.teacherId !== teacherId) {
      throw new ForbiddenException();
    }

    return this.prisma.course.delete({
      where: { id: courseId },
    });
  }
}
