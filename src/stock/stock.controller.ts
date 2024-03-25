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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStockDto } from './dto/create-stock.dto';
import { SUCCESS_RESPONSE, SuccessResponse } from '../utils/SuccessResponse';


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
  @ApiResponse({ status: 200, type: [CreateStockDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':medicineId')
  @ApiOperation({ summary: 'Consultar estoque por ID do medicamento' })
  @ApiResponse({ status: 200, type: CreateStockDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Medicine not found' })
  @ApiParam({ name: 'medicineId', type: String })
  findOne(@Param('medicineId', ParseUUIDPipe) medicineId: string) {
    return this.stockService.findOne(medicineId);
  }

  @Patch(':medicineId')
  @ApiOperation({ summary: 'Atualizar estoque por ID do medicamento' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Medicine not found' })
  @ApiParam({ name: 'medicineId', type: String })
  @ApiBody({ type: UpdateStockDto })
  update(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(medicineId, updateStockDto);
  }

  @Patch(':medicineId/add/:quantity')
  @ApiOperation({ summary: 'Adicionar ao estoque por ID do medicamento' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Medicine not found' })
  @ApiParam({ name: 'medicineId', type: String })
  @ApiParam({ name: 'quantity', type: Number })
  async addToStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<SuccessResponse> {
    const medicine = await this.medicineService.findOne(medicineId);
    return await this.stockService.addToStock(medicine, +quantity);
  }

  @Patch(':medicineId/remove/:quantity')
  @ApiOperation({ summary: 'Remover do estoque por ID do medicamento' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Medicine not found' })
  @ApiParam({ name: 'medicineId', type: String })
  @ApiParam({ name: 'quantity', type: Number })
  async removeFromStock(
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
    @Param('quantity') quantity: number,
  ): Promise<SuccessResponse> {
    return await this.stockService.removeFromStock(medicineId, +quantity);
  }
}
