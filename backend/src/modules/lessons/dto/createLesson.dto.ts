import { IsDateString, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  courseId!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;
}
