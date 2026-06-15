import { Module } from '@nestjs/common';
import { GradesController } from 'src/modules/grades/grades.controller';
import { GradesService } from 'src/modules/grades/grades.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
