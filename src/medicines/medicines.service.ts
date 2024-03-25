import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './entities/medicine.entity';
import { StockService } from '../stock/stock.service';
import { SUCCESS_RESPONSE, SuccessResponse } from '../utils/SuccessResponse';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    private readonly stockService: StockService,
  ) {}

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    try {
      await this.existsMedicineWithSameName(createMedicineDto.name);

      const medicine = await this.medicineRepository.save(createMedicineDto);
      await this.stockService.create({
        medicineId: medicine.id,
        quantity: createMedicineDto.stockQuantity || 0,
      });
      return medicine;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Medicine[]> {
    try {
      const medicines = await this.medicineRepository.find({
        relations: ['stock', 'groups'],
      });
      return medicines;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Medicine> {
    try {
      const medicine = await this.medicineRepository.findOne({
        where: { id },
        relations: ['stock', 'groups'],
      });

      if (!medicine) {
        throw new NotFoundException(`Medicine with id ${id} not found`);
      }

      return medicine;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateMedicineDto: UpdateMedicineDto): Promise<SuccessResponse> {
    try {
      await this.findOne(id);

      await this.medicineRepository.update(id, updateMedicineDto);
      return SUCCESS_RESPONSE;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<SuccessResponse> {
    try {
      await this.findOne(id);

      await this.medicineRepository.delete(id);
      return SUCCESS_RESPONSE;
    } catch (error) {
      throw error;
    }
  }

  async checkIfExists(name: string): Promise<boolean> {
    try {
      const medicineIfExists = await this.medicineRepository.findOne({
        where: { name },
      });

      return !medicineIfExists;
    } catch (error) {
      throw error;
    }
  }

  private async existsMedicineWithSameName(name: string): Promise<void> {
    const medicineIfExists = await this.medicineRepository.findOne({
      where: { name },
    });
    if (medicineIfExists) {
      throw new ConflictException('Medicine already exists');
    }
  }
}
