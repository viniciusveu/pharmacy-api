import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SUCCESS_RESPONSE } from '../utils/SuccessResponse';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth()
@ApiTags('medicines')
@UseGuards(AuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new medicine' })
  @ApiBody({ type: CreateMedicineDto })
  @ApiResponse({ status: 201, type: Medicine })
  create(@Body() createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    return this.medicinesService.create(createMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all medicines' })
  @ApiResponse({ status: 200, type: [Medicine] })
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific medicine' })
  @ApiResponse({ status: 200, type: Medicine })
  @ApiResponse({ status: 404, description: 'Medicine not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific medicine' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiBody({ type: UpdateMedicineDto })
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific medicine' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 404, description: 'Medicine not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicinesService.remove(id);
  }
}
