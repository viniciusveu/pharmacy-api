import { Injectable } from '@nestjs/common';
import { CreateMedicineGroupDto } from './dto/create-medicine-group.dto';
import { UpdateMedicineGroupDto } from './dto/update-medicine-group.dto';

@Injectable()
export class MedicineGroupsService {
  create(createMedicineGroupDto: CreateMedicineGroupDto) {
    return 'This action adds a new medicineGroup';
  }

  findAll() {
    return `This action returns all medicineGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicineGroup`;
  }

  update(id: number, updateMedicineGroupDto: UpdateMedicineGroupDto) {
    return `This action updates a #${id} medicineGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicineGroup`;
  }
}
