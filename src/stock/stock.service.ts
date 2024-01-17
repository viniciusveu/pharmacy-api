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

  async create(createStockDto: CreateStockDto) {
    return await this.stockRepository.save(createStockDto);
  }

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOne(id: string) {
    return await this.stockRepository.findOne({
      where: { id },
    });
  }

  async findOneByMedicineId(medicineId: string) {
    return await this.stockRepository.findOne({
      where: { medicineId },
    });
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    return await this.stockRepository.update(id, updateStockDto);
  }

  async updateByMedicineId(medicineId: string, updateStockDto: UpdateStockDto) {
    return await this.stockRepository.update(medicineId, updateStockDto);
  }

  async remove(id: string) {
    return await this.stockRepository.delete(id);
  }

  async addProductsToStock(
    medicine: Medicine,
    quantity: number,
  ): Promise<void> {
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
  }

  async removeProductsFromStock(
    medicineId: string,
    quantity: number,
  ): Promise<void> {
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
  }
}
