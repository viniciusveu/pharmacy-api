import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsNumber()
  @IsOptional()
  batch: number;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  posology: string;

  @IsString()
  @IsOptional()
  indications: string;

  @IsString()
  @IsOptional()
  contraindications: string;
}
