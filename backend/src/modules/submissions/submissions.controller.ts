import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

import { CreateSubmissionDto } from 'src/modules/submissions/dto/createSubmission.dto';
import { SubmissionsService } from './submissions.service';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = randomUUID();
          const ext = extname(file.originalname);

          cb(null, `${unique}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(new BadRequestException('Only PDF allowed'), false);
        }

        cb(null, true);
      },
    }),
  )
  createSubmission(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateSubmissionDto,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.submissionsService.createSubmission(file, dto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSubmissions() {
    return this.submissionsService.getSubmissions();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  getMySubmissions(@Req() req: Request & { user: { id: string } }) {
    return this.submissionsService.getMySubmissions(req.user.id);
  }
}
