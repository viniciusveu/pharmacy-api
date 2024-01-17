import { Module, forwardRef } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { MedicinesModule } from '../medicines/medicines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    forwardRef(() => MedicinesModule),
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
