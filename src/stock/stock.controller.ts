import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { MedicinesService } from '../medicines/medicines.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly medicineService: MedicinesService,
  ) {}

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':medicationId')
  findOne(@Param('medicationId') id: string) {
    return this.stockService.findOne(id);
  }

  @Put(':medicineId/add/:quantity')
  async addProductsToStock(
    @Param('medicineId', new ParseUUIDPipe()) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    const medicine = await this.medicineService.findOne(medicineId);
    await this.stockService.addProductsToStock(medicine, quantity);
  }

  @Put(':medicineId/remove/:quantity')
  async removeProductsFromStock(
    @Param('medicineId', new ParseUUIDPipe()) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    await this.stockService.removeProductsFromStock(medicineId, quantity);
  }
}
