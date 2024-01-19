import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  medicineId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive({ message: 'Quantity must be a positive number' })
  @ValidateIf((o, value) => value !== undefined && value !== null)  quantity: number;

  @IsString()
  @IsOptional()
  category?: string;
}
