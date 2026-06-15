import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class AssignGradeDto {
  @IsUUID()
  submissionId!: string;

  @IsInt()
  @Min(0)
  @Max(100)
  score!: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
