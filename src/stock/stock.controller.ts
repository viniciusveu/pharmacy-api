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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('stock')
@UseGuards(AuthGuard)
@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly medicineService: MedicinesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Consultar estoque' })
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':medicineId')
  @ApiOperation({ summary: 'Consultar estoque por ID do medicamento' })
  findOne(@Param('medicineId', ParseUUIDPipe) medicineId: string) {
    return this.stockService.findOne(medicineId);
  }

  @Patch(':medicineId')
  @ApiOperation({ summary: 'Atualizar estoque por ID do medicamento' })
  update(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(medicineId, updateStockDto);
  }

  @Patch(':medicineId/add/:quantity')
  @ApiOperation({ summary: 'Adicionar ao estoque por ID do medicamento' })
  async addToStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    const medicine = await this.medicineService.findOne(medicineId);
    await this.stockService.addToStock(medicine, +quantity);
  }

  @Patch(':medicineId/remove/:quantity')
  @ApiOperation({ summary: 'Remover do estoque por ID do medicamento' })
  async removeFromStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<void> {
    await this.stockService.removeFromStock(medicineId, +quantity);
  }
}
