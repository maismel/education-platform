import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from 'src/modules/users/dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
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
