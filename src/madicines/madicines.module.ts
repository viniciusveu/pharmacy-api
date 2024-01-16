import { Module } from '@nestjs/common';
import { MadicinesService } from './madicines.service';
import { MadicinesController } from './madicines.controller';

@Module({
  controllers: [MadicinesController],
  providers: [MadicinesService],
})
export class MadicinesModule {}
