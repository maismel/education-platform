import { Module } from '@nestjs/common';
import { AttendanceController } from 'src/modules/attendance/attendance.controller';
import { AttendanceService } from 'src/modules/attendance/attendance.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
