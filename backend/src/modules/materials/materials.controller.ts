import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Req,
  BadRequestException,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from 'src/modules/materials/dto/create-material.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
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
  uploadMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateMaterialDto,
    @Req() req,
  ) {
    return this.materialsService.create(file, dto, req.user.id);
  }

  @Get('lesson/:lessonId')
  getByLesson(@Param('lessonId') lessonId: string) {
    return this.materialsService.getByLesson(lessonId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.materialsService.delete(id);
  }
}
