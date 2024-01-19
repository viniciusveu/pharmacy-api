import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { MedicinesService } from '../medicines/medicines.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly medicineService: MedicinesService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':medicineId')
  @UseGuards(AuthGuard)
  findOne(@Param('medicineId', ParseUUIDPipe) medicineId: string) {
    return this.stockService.findOne(medicineId);
  }

  @Patch(':medicineId')
  @UseGuards(AuthGuard)
  update(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(medicineId, updateStockDto);
  }

  @Patch(':medicineId/add/:quantity')
  @UseGuards(AuthGuard)
  async addToStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    const medicine = await this.medicineService.findOne(medicineId);
    await this.stockService.addToStock(medicine, +quantity);
  }

  @Patch(':medicineId/remove/:quantity')
  @UseGuards(AuthGuard)
  async removeFromStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    await this.stockService.removeFromStock(medicineId, +quantity);
  }
}
