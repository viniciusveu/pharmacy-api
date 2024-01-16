import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MadicinesService } from './madicines.service';
import { CreateMadicineDto } from './dto/create-madicine.dto';
import { UpdateMadicineDto } from './dto/update-madicine.dto';

@Controller('madicines')
export class MadicinesController {
  constructor(private readonly madicinesService: MadicinesService) {}

  @Post()
  create(@Body() createMadicineDto: CreateMadicineDto) {
    return this.madicinesService.create(createMadicineDto);
  }

  @Get()
  findAll() {
    return this.madicinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.madicinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMadicineDto: UpdateMadicineDto,
  ) {
    return this.madicinesService.update(+id, updateMadicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.madicinesService.remove(+id);
  }
}
