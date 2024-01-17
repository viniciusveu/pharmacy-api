import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineGroupDto } from './create-medicine-group.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicineGroupDto extends PartialType(
  CreateMedicineGroupDto,
) {
  @IsString()
  @IsOptional()
  name: string;
}
