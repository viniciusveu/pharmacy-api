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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Medicine } from '../medicines/entities/medicine.entity';
import { SUCCESS_RESPONSE } from '../utils/SuccessResponse';


@ApiBearerAuth()
@ApiTags('medicine-groups')
@UseGuards(AuthGuard)
@Controller('medicine-groups')
export class MedicineGroupsController {
  constructor(private readonly medicineGroupsService: MedicineGroupsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new medicine group' })
  @ApiResponse({ status: 201, type: Medicine })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: CreateMedicineGroupDto })
  create(@Body() createMedicineGroupDto: CreateMedicineGroupDto) {
    return this.medicineGroupsService.create(createMedicineGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all medicine groups' })
  @ApiResponse({ status: 200, type: [Medicine] })
  findAll() {
    return this.medicineGroupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific medicine group' })
  @ApiResponse({ status: 200, type: Medicine })
  @ApiParam({ name: 'id', type: String, description: 'The id of the medicine group' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific medicine group' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 404, description: 'Medicine group not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: UpdateMedicineGroupDto })
  @ApiParam({ name: 'id', type: String, description: 'The id of the medicine group' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicineGroupDto: UpdateMedicineGroupDto,
  ) {
    return this.medicineGroupsService.update(id, updateMedicineGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific medicine group' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 404, description: 'Medicine group not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiParam({ name: 'id', type: String, description: 'The id of the medicine group' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicineGroupsService.remove(id);
  }

  @Patch(':groupId/add/:medicineId')
  @ApiOperation({ summary: 'Add a medicine to a specific group' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 404, description: 'Medicine or group not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'medicineId', type: String, description: 'The id of the medicine' })
  @ApiParam({ name: 'groupId', type: String, description: 'The id of the group' })
  addMedicineToGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.addMedicineToGroup(groupId, medicineId);
  }

  @Patch(':groupId/remove/:medicineId')
  @ApiOperation({ summary: 'Remove a medicine from a specific group' })
  @ApiResponse({ status: 200, description: JSON.stringify(SUCCESS_RESPONSE) })
  @ApiResponse({ status: 404, description: 'Medicine or group not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'medicineId', type: String, description: 'The id of the medicine' })
  @ApiParam({ name: 'groupId', type: String, description: 'The id of the group' })
  removeMedicineFromGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('medicineId', ParseUUIDPipe) medicineId: string,
  ) {
    return this.medicineGroupsService.removeMedicineFromGroup(groupId, medicineId);
  }
}
