import { AttendanceStatus } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  studentId!: string;

  @IsString()
  lessonId!: string;

  @IsString()
  status!: AttendanceStatus;

  comment?: string;
}
