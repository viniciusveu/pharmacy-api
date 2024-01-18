import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MedicineGroupsService } from './medicine-groups.service';
import { CreateMedicineGroupDto } from './dto/create-medicine-group.dto';
import { UpdateMedicineGroupDto } from './dto/update-medicine-group.dto';
import { AddOrRemoveMedicinesDto } from './dto/add-or-remove-medicines.dto';

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
  findOne(@Param('id') id: string) {
    return this.medicineGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineGroupDto: UpdateMedicineGroupDto,
  ) {
    return this.medicineGroupsService.update(id, updateMedicineGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineGroupsService.remove(id);
  }

  @Put(':groupId/add')
  addMedicinesToGroup(
    @Param('groupId') groupId: string,
    @Body('addOrRemoveMedicinesDto') addOrRemoveMedicinesDto: AddOrRemoveMedicinesDto,
  ) {
    return this.medicineGroupsService.addMedicinesToGroup(groupId, addOrRemoveMedicinesDto);
  }

  @Put(':groupId/remove')
  removeMedicinesFromGroup(
    @Param('groupId') groupId: string,
    @Body('addOrRemoveMedicinesDto') addOrRemoveMedicinesDto: AddOrRemoveMedicinesDto,
  ) {
    return this.medicineGroupsService.removeMedicinesFromGroup(groupId, addOrRemoveMedicinesDto);
  }
}
