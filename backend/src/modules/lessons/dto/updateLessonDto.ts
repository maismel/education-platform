import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from 'src/modules/lessons/dto/createLesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
