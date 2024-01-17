import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateStockDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  medicineId: string;

  @IsString()
  @IsNotEmpty()
  quantity: number;
}
