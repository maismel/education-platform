import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubmissionDto {
  @IsUUID()
  lessonId!: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
