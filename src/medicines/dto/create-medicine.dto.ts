import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsNumber()
  @IsNotEmpty()
  batch: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  posology: string;

  @IsString()
  @IsNotEmpty()
  indications: string;

  @IsString()
  @IsNotEmpty()
  contraindications: string;
}
