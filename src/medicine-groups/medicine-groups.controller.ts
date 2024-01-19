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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('medicine-groups')
@UseGuards(AuthGuard)
@Controller('medicine-groups')
export class MedicineGroupsController {
  constructor(private readonly medicineGroupsService: MedicineGroupsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new medicine group' })
  create(@Body() createMedicineGroupDto: CreateMedicineGroupDto) {
    return this.medicineGroupsService.create(createMedicineGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all medicine groups' })
  findAll() {
    return this.medicineGroupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific medicine group' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific medicine group' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicineGroupDto: UpdateMedicineGroupDto,
  ) {
    return this.medicineGroupsService.update(id, updateMedicineGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific medicine group' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.remove(id);
  }

  @Patch(':groupId/add/:medicineId')
  @ApiOperation({ summary: 'Add a medicine to a specific group' })
  addMedicineToGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.addMedicineToGroup(groupId, medicineId);
  }

  @Patch(':groupId/remove/:medicineId')
  @ApiOperation({ summary: 'Remove a medicine from a specific group' })
  removeMedicineFromGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.removeMedicineFromGroup(groupId, medicineId);
  }
}
