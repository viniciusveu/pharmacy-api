import { Module } from '@nestjs/common';
import { MedicineGroupsService } from './medicine-groups.service';
import { MedicineGroupsController } from './medicine-groups.controller';

@Module({
  controllers: [MedicineGroupsController],
  providers: [MedicineGroupsService],
})
export class MedicineGroupsModule {}
