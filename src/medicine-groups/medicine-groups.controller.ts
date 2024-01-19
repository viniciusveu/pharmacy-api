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
import { MedicineGroupsService } from './medicine-groups.service';
import { CreateMedicineGroupDto } from './dto/create-medicine-group.dto';
import { UpdateMedicineGroupDto } from './dto/update-medicine-group.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('medicine-groups')
export class MedicineGroupsController {
  constructor(private readonly medicineGroupsService: MedicineGroupsService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createMedicineGroupDto: CreateMedicineGroupDto) {
    return this.medicineGroupsService.create(createMedicineGroupDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.medicineGroupsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicineGroupDto: UpdateMedicineGroupDto,
  ) {
    return this.medicineGroupsService.update(id, updateMedicineGroupDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.remove(id);
  }

  @Patch(':groupId/add/:medicineId')
  @UseGuards(AuthGuard)
  addMedicineToGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.addMedicineToGroup(groupId, medicineId);
  }

  @Patch(':groupId/remove/:medicineId')
  @UseGuards(AuthGuard)
  removeMedicineFromGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.removeMedicineFromGroup(groupId, medicineId);
  }
}
