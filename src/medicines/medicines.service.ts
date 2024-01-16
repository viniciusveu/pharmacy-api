import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Medicine } from './entities/medicine.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    try {
      const medicine = await this.medicineRepository.save(createMedicineDto);
      return medicine;
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async findAll(): Promise<Medicine[]> {
    try {
      const medicines = await this.medicineRepository.find();
      return medicines;
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
    });

    if (!medicine) {
      throw new NotFoundException('Medicine not found');
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
