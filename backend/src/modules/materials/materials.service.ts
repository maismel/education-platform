import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from 'src/modules/materials/dto/create-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  async create(
    file: Express.Multer.File,
    dto: CreateMaterialDto,
    userId: string,
  ) {
    const fixedFileName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );

    return this.prisma.material.create({
      data: {
        lessonId: dto.lessonId,
        uploadedById: userId,
        fileName: fixedFileName,
        fileUrl: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        comment: dto.comment,
      },
    });
  }

  async getByLesson(lessonId: string) {
    return this.prisma.material.findMany({
      where: { lessonId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) throw new NotFoundException('Material not found');

    return this.prisma.material.delete({
      where: { id },
    });
  }
}
