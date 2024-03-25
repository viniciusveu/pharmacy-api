/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class  CreateMedicineDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Paracetamol',
    description: 'The name of the medicine',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Paracetamol 500mg',
    description: 'The description of the medicine',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bayer',
    description: 'The manufacturer of the medicine',
  })
  manufacturer: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'The batch of the medicine',
  })
  batch: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'tableta',
    description: 'The type of the medicine',
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Take one tablet every 8 hours',
    description: 'The posology of the medicine',
  })
  posology: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Headaches',
    description: 'The indications of the medicine',
  })
  indications: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Headaches',
    description: 'The contraindications of the medicine',
  })
  contraindications: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 10,
  })
  stockQuantity?: number;
}
