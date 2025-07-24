import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionAnswerDto } from './create-answer.dto';

export class UpdateQuestionAnswerDto extends PartialType(CreateQuestionAnswerDto) {}
