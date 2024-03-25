/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MedicineGroupsService } from './medicine-groups.service';
import { MedicineGroupsController } from './medicine-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineGroup } from './entities/medicine-group.entity';
import { MedicinesModule } from '../medicines/medicines.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineGroup]), MedicinesModule],
  controllers: [MedicineGroupsController],
  providers: [MedicineGroupsService],
})
export class MedicineGroupsModule {}
