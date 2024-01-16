import { Injectable } from '@nestjs/common';
import { CreateMadicineDto } from './dto/create-madicine.dto';
import { UpdateMadicineDto } from './dto/update-madicine.dto';

@Injectable()
export class MadicinesService {
  create(createMadicineDto: CreateMadicineDto) {
    return 'This action adds a new madicine';
  }

  findAll() {
    return `This action returns all madicines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} madicine`;
  }

  update(id: number, updateMadicineDto: UpdateMadicineDto) {
    return `This action updates a #${id} madicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} madicine`;
  }
}
