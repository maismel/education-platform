import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMaterialDto {
  @IsUUID()
  lessonId!: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
