import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { CreateSubmissionDto } from 'src/modules/submissions/dto/createSubmission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async createSubmission(
    file: Express.Multer.File,
    dto: CreateSubmissionDto,
    studentId: string,
  ) {
    const fixedFileName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );

    return this.prisma.submission.create({
      data: {
        lessonId: dto.lessonId,
        studentId,

        fileName: fixedFileName,
        fileUrl: `/uploads/${file.filename}`,
        mimeType: file.mimetype,

        comment: dto.comment,
        status: Status.PENDING,
      },
      include: {
        lesson: true,
        student: true,
      },
    });
  }

  async getSubmissions() {
    const submissions = await this.prisma.submission.findMany({
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
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

  async getMySubmissions(studentId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: {
        studentId,
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return submissions;
  }

  async deleteSubmission(id: string) {
    const submission = await this.prisma.submission.delete({
      where: {
        id,
      },
    });
    return submission;
  }
}
