import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  teacherId?: string;
}
