import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  //   async getUserCourses(userId: string) {
  //     const courses = await this.prisma.course.findMany({
  //       where: {
  //         teacherId: userId,
  //       },
  //     });
  //     return courses;
  //   }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
