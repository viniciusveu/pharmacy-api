import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicineGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ 
    description: 'Name of the medicine group',
    example: 'Antibiotics',
    required: true
  })
  name: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    description: 'List of medicine ids',
    example: ['0afd9b8c-cd50-4eaf-beb7-c6245dfdc75e', '2ad3b1f6-3e3d-4b9d-8b0e-8b9b0f8b0e8b'],
    required: false
  })
  medicineIds: string[];
}
