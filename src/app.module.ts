import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MedicineGroupsModule } from './medicine-groups/medicine-groups.module';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MedicinesModule } from './medicines/medicines.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DB_PORT || 5432,
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'pwd',
      database: process.env.DB_DATABASE || 'pharmacyDb',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    UsersModule,
    MedicineGroupsModule,
    StockModule,
    AuthModule,
    MedicinesModule,
  ],
})
export class AppModule {}
