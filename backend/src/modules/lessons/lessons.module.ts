import { Module } from '@nestjs/common';
import { LessonsService } from 'src/modules/lessons/lesson.service';
import { LessonsController } from 'src/modules/lessons/lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
