import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(15)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  bio?: string;
}
