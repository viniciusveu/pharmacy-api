import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { MedicinesService } from '../medicines/medicines.service';
import { UpdateStockDto } from './dto/update-stock.dto';

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

  @Get(':medicineId')
  findOne(@Param('medicineId', ParseUUIDPipe) medicineId: string) {
    return this.stockService.findOne(medicineId);
  }

  @Patch(':medicineId')
  update(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(medicineId, updateStockDto);
  }

  @Patch(':medicineId/add/:quantity')
  async addToStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    const medicine = await this.medicineService.findOne(medicineId);
    await this.stockService.addToStock(medicine, +quantity);
  }

  @Patch(':medicineId/remove/:quantity')
  async removeFromStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    await this.stockService.removeFromStock(medicineId, +quantity);
  }
}
