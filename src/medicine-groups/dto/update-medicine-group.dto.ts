import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineGroupDto } from './create-medicine-group.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMedicineGroupDto extends PartialType(
  CreateMedicineGroupDto,
) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the medicine group',
    example: 'Antibiotics',
    required: false,
  })
  name: string;
}
