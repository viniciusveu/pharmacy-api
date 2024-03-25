/* istanbul ignore file */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the medicine',
    example: 'Paracetamol',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the medicine',
    example: 'Used to relieve pain and reduce fever.',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Manufacturer of the medicine',
    example: 'Pharma Inc.',
    required: false,
  })
  manufacturer: string;

  @ApiProperty({
    description: 'Batch number of the medicine',
    example: 123456,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  batch: number;

  @ApiProperty({
    description: 'Type of the medicine',
    example: 'Tablet',
    required: false,
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    description: 'Posology of the medicine',
    example: '1 tablet every 8 hours',
    required: false,
  })
  @IsString()
  @IsOptional()
  posology: string;

  @ApiProperty({
    description: 'Indications of the medicine',
    example: 'Headache, Fever',
    required: false,
  })
  @IsString()
  @IsOptional()
  indications: string;

  @ApiProperty({
    description: 'Contraindications of the medicine',
    example: 'Allergy to paracetamol',
    required: false,
  })
  @IsString()
  @IsOptional()
  contraindications: string;
}
