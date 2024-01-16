import { Module } from '@nestjs/common';
import { MadicinesModule } from './madicines/madicines.module';
import { UsersModule } from './users/users.module';
import { MedicineGroupsModule } from './medicine-groups/medicine-groups.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [MadicinesModule, UsersModule, MedicineGroupsModule, StockModule],
})
export class AppModule {}
