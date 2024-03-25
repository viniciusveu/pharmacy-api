/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'a9f6f9b0-9b8b-4b4e-9f6f-9b0a9f6f9b0a',
    required: true,
  })
  medicineId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'Quantity must be a positive number' })
  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
    default: 0,
  })
  quantity: number;
  
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'generic',
    required: false,
    default: 'default',
  })
  category?: string;
}
