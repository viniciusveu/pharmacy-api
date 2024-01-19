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
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('medicines')
@UseGuards(AuthGuard)
@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new medicine' })
  create(@Body() createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    return this.medicinesService.create(createMedicineDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all medicines' })
  findAll() {
    return this.medicinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific medicine' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific medicine' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific medicine' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicinesService.remove(id);
  }
}
