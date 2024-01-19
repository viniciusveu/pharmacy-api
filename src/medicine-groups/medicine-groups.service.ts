import { Body, ConflictException, Injectable, Param } from '@nestjs/common';
import { CreateMedicineGroupDto } from './dto/create-medicine-group.dto';
import { UpdateMedicineGroupDto } from './dto/update-medicine-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineGroup } from './entities/medicine-group.entity';
import { MedicinesService } from '../medicines/medicines.service';
import { Medicine } from '../medicines/entities/medicine.entity';

@Injectable()
export class MedicineGroupsService {
  constructor(
    @InjectRepository(MedicineGroup)
    private readonly medicineGroupRepository: Repository<MedicineGroup>,
    private readonly medicinesService: MedicinesService,
  ) { }

  async create(
    createMedicineGroupDto: CreateMedicineGroupDto,
  ): Promise<MedicineGroup> {
    const { name, medicineIds } = createMedicineGroupDto;

    const existingMedicineGroup = await this.medicineGroupRepository.findOne({
      where: { name },
    });
    if (existingMedicineGroup) {
      throw new ConflictException('Medicine group already exists');
    }

    const medicines = await this.checkMedicineIds(medicineIds);

    const medicineGroup = this.medicineGroupRepository.save({
      name,
      medicines,
    });

    return medicineGroup;
  }

  async findAll(): Promise<MedicineGroup[]> {
    return await this.medicineGroupRepository.find({
      relations: ['medicines', 'medicines.stock'],
    });
  }

  async findOne(id: string) {
    return await this.medicineGroupRepository.findOne({
      where: { id },
      relations: ['medicines', 'medicines.stock'],
    });
  }

  async update(id: string, updateMedicineGroupDto: UpdateMedicineGroupDto) {
    const group = await this.findOne(id);
    if (!group) {
      throw new Error('Medicine group not found');
    }

    if (updateMedicineGroupDto.name !== undefined) {
      group.name = updateMedicineGroupDto.name;
    }
    if (updateMedicineGroupDto.medicineIds !== undefined) {
      group.medicines = await this.checkMedicineIds(updateMedicineGroupDto.medicineIds);
    }
    await this.medicineGroupRepository.save(group);

    return { success: true };
  }

  async remove(id: string) {
    return await this.medicineGroupRepository.delete({ id });
  }

  async addMedicineToGroup(id: string, medicineId: string) {
    const group = await this.findOne(id);
    if (!group) {
      throw new Error('Medicine group not found');
    }

    const medicine = await this.medicinesService.findOne(medicineId);
    if (!medicine) {
      throw new Error('Medicine not found');
    }

    group.medicines = [...group.medicines, medicine];
    await this.medicineGroupRepository.save(group);

    return { success: true };
  }

  async removeMedicineFromGroup(groupId: string, medicineId: string) {
    const group = await this.findOne(groupId);
    group.medicines = group.medicines.filter((medicine) => medicine.id !== medicineId);

    await this.medicineGroupRepository.save(group);

    return { success: true };
  }

  private async checkMedicineIds(medicineIds: string[]): Promise<Medicine[]> {
    const medicines: Medicine[] = await Promise.all(
      medicineIds.map(async (medicineId) => {
        const medicine = await this.medicinesService.findOne(medicineId);
        return medicine;
      }),
    );

    return medicines;
  }
}
