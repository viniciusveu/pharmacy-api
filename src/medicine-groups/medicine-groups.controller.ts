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
import { MedicineGroupsService } from './medicine-groups.service';
import { CreateMedicineGroupDto } from './dto/create-medicine-group.dto';
import { UpdateMedicineGroupDto } from './dto/update-medicine-group.dto';

@Controller('medicine-groups')
export class MedicineGroupsController {
  constructor(private readonly medicineGroupsService: MedicineGroupsService) { }

  @Post()
  create(@Body() createMedicineGroupDto: CreateMedicineGroupDto) {
    return this.medicineGroupsService.create(createMedicineGroupDto);
  }

  @Get()
  findAll() {
    return this.medicineGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicineGroupDto: UpdateMedicineGroupDto,
  ) {
    return this.medicineGroupsService.update(id, updateMedicineGroupDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.remove(id);
  }

  @Patch(':groupId/add/:medicineId')
  addMedicineToGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.addMedicineToGroup(groupId, medicineId);
  }

  @Patch(':groupId/remove/:medicineId')
  removeMedicineFromGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.removeMedicineFromGroup(groupId, medicineId);
  }
}
