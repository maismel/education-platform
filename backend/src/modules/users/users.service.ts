import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from 'src/modules/users/dto/create-teacher.dto';
import { UpdateProfileDto } from 'src/modules/users/dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  // PROFILE

  async getById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId, isActive: true },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
        isActive: true,
      },
    });
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    avatarFile?: Express.Multer.File,
  ) {
    const avatarUrl = avatarFile
      ? `/uploads/avatars/${avatarFile.filename}`
      : undefined;

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        bio: dto.bio,
        ...(avatarUrl && { avatarUrl }),
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        avatarUrl: true,
      },
      where: {
        isActive: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // PROFILE MANAGEMENT
  async createTeacher(dto: CreateTeacherDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: 'TEACHER',
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  async deactivateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }

  async getUserCourses(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'TEACHER') {
      return this.prisma.course.findMany({
        where: {
          teacherId: userId,
        },
        include: {
          teacher: true,
        },
      });
    }

    if (user.role === 'STUDENT') {
      return this.prisma.course.findMany({
        where: {
          enrollments: {
            some: {
              studentId: userId,
            },
          },
        },
        include: {
          teacher: true,
        },
      });
    }

    return [];
  }
}
