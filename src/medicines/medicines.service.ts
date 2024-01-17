import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Medicine } from './entities/medicine.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { StockService } from '../stock/stock.service';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    private readonly stockService: StockService,
  ) {}

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    const medicineIfExists = await this.medicineRepository.findOne({
      where: { name: createMedicineDto.name },
    });
    if (medicineIfExists) {
      throw new ConflictException('Medicine already exists');
    }

    const medicine = await this.medicineRepository.save(createMedicineDto);
    this.stockService.create({
      medicineId: medicine.id,
      quantity: createMedicineDto.stockQuantity || 0,
    });
    return medicine;
  }

  async findAll(): Promise<Medicine[]> {
    try {
      const medicines = await this.medicineRepository.find({
        relations: ['stock', 'groups'],
      });
      return medicines;
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
      relations: ['stock', 'groups'],
    });

    if (!medicine) {
      throw new NotFoundException(`Medicine with id ${id} not found`);
    }

    return medicine;
  }

  async update(
    id: string,
    updateMedicineDto: UpdateMedicineDto,
  ): Promise<UpdateResult> {
    try {
      const medicine = this.medicineRepository.update(id, updateMedicineDto);
      return medicine;
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const medicine = await this.medicineRepository.delete(id);
      return medicine;
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}
