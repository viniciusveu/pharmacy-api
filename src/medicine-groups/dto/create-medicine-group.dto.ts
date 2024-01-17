import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicineGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  medicineIds: string[];
}
