import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { MedicinesService } from '../medicines/medicines.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly medicineService: MedicinesService,
  ) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }

  @Post(':medicineId/add-products')
  async addProductsToStock(
    @Param('medicineId', new ParseUUIDPipe()) medicineId: string,
    @Body('quantity') quantity: number,
  ): Promise<void> {
    const medicine = await this.medicineService.findOne(medicineId);
    await this.stockService.addProductsToStock(medicine, quantity);
  }

  @Post(':medicineId/remove-products')
  async removeProductsFromStock(
    @Param('medicineId', new ParseUUIDPipe()) medicineId: string,
    @Body('quantity') quantity: number,
  ): Promise<void> {
    await this.stockService.removeProductsFromStock(medicineId, quantity);
  }
}
