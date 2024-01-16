import { PartialType } from '@nestjs/mapped-types';
import { CreateMadicineDto } from './create-madicine.dto';

export class UpdateMadicineDto extends PartialType(CreateMadicineDto) {}
