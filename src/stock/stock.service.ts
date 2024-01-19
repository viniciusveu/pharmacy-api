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

  async remove(medicineId: string): Promise<Object> {
    const stock = await this.stockRepository.findOne({
      where: { medicineId },
    })

    if (!stock) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicineId} not found`,
      );
    }

    await this.stockRepository.delete(medicineId);

    return { success: true };
  }

  async update(medicineId: string, updateStockDto: UpdateStockDto): Promise<Object> {
    const stock = await this.stockRepository.findOne({
      where: { medicineId },
    })

    if (!stock) {
      throw new NotFoundException(
        `Stock entry for medicine with id ${medicineId} not found`,
      );
    }

    await this.stockRepository.save({ ...stock, ...updateStockDto });

    return { success: true };
  }

  async addToStock(
    medicine: Medicine,
    quantity: number,
  ): Promise<Object> {
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

    return { success: true };
  }

  async removeFromStock(
    medicineId: string,
    quantity: number,
  ): Promise<Object> {
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

    return { success: true };
  }
}
