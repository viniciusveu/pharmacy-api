import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { Medicine } from '../medicines/entities/medicine.entity';
import { SUCCESS_RESPONSE, SuccessResponse } from '../utils/SuccessResponse';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    return await this.stockRepository.save(createStockDto);
  }

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOne(medicineId: string): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { medicineId },
    });

    if (!stock) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicineId} not found`,
      );
    }

    return stock;
  }

  async remove(medicineId: string): Promise<SuccessResponse> {
    const stock = await this.stockRepository.findOne({
      where: { medicineId },
    })

    if (!stock) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicineId} not found`,
      );
    }

    await this.stockRepository.delete(medicineId);

    return SUCCESS_RESPONSE;
  }

  async update(medicineId: string, updateStockDto: UpdateStockDto): Promise<SuccessResponse> {
    const stock = await this.stockRepository.find({
      where: { medicineId, id: updateStockDto.id },
    })

    if (!stock.length) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicineId} not found`,
      );
    }

    await this.stockRepository.save({ ...stock, ...updateStockDto });

    return SUCCESS_RESPONSE;
  }

  async addToStock(
    medicine: Medicine,
    quantity: number,
  ): Promise<SuccessResponse> {
    const stockEntry = await this.stockRepository.findOne({
      where: { medicine: { id: medicine.id } },
    });

    if (!stockEntry) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicine.id} not found`,
      );
    }

    stockEntry.quantity += quantity;

    await this.stockRepository.save(stockEntry);

    return SUCCESS_RESPONSE;
  }

  async removeFromStock(
    medicineId: string,
    quantity: number,
  ): Promise<SuccessResponse> {
    const stockEntry = await this.stockRepository.findOne({
      where: { medicine: { id: medicineId } },
    });

    if (!stockEntry) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicineId} not found`,
      );
    }

    if (stockEntry.quantity < quantity) {
      throw new BadRequestException(
        `Not enough products in stock for medicine with id ${medicineId}`,
      );
    }

    stockEntry.quantity -= quantity;

    await this.stockRepository.save(stockEntry);

    return SUCCESS_RESPONSE;
  }
}
