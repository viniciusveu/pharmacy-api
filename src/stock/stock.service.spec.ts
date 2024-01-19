import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { NotFoundException } from '@nestjs/common';
import { Medicine } from 'src/medicines/entities/medicine.entity';

const mockMedicine: Medicine = {
  "id": "ac36d71b-280a-4c59-9e31-e7c575d30534",
  "name": "Paracetamol",
  "description": "Medicine for headaches",
  "manufacturer": "Bayer",
  "batch": 1235,
  "type": "Tablet",
  "posology": "Take one tablet every 8 hours",
  "indications": "Headaches",
  "contraindications": "None",
  "stock": [],
  "groups": []
}

describe('StockService', () => {
  let service: StockService;
  const mockStockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: getRepositoryToken(Stock),
          useValue: mockStockRepository,
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new stock and return it', async () => {
      const newStock = new Stock();
      mockStockRepository.save.mockResolvedValue(newStock);

      expect(await service.create(newStock)).toBe(newStock);
    });

    it('should throw an error when creation fails', async () => {
      const newStock = new Stock();
      mockStockRepository.save.mockRejectedValue(new Error('Failed to create stock'));

      await expect(service.create(newStock)).rejects.toThrow('Failed to create stock');
    });
  });

  describe('remove', () => {
    it('should remove stock and return affected result', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: '1' });
      mockStockRepository.delete.mockResolvedValue({ affected: 1 });

      expect(await service.remove('1')).toEqual({ success: true });
    });

    it('should throw an error when removal fails', async () => {
      mockStockRepository.delete.mockRejectedValue(new Error('Stock entry for medicine with id non-existent-id not found'));

      await expect(service.remove('non-existent-id')).rejects.toThrow('Stock entry for medicine with id non-existent-id not found');
    });
  });

  describe('findAll', () => {
    it('should return an array of stocks', async () => {
      mockStockRepository.find.mockResolvedValue([new Stock()]);
      expect(await service.findAll()).toEqual([new Stock()]);
    });
  });

  describe('findOne', () => {
    it('should return a stock', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: '1' });
      expect(await service.findOne('1')).toEqual({ id: '1' });
    });

    it('should throw an error if the stock does not exist', async () => {
      mockStockRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne('1')).rejects.toThrow('Stock entry for medicine with id 1 not found');
    });
    
    it('should throw an error if the medicine does not exist', async () => {
      mockStockRepository.findOne.mockImplementation((id) => {
        throw new NotFoundException(`Stock not found`);
      });
      await expect(service.findOne('1')).rejects.toThrow(`Stock not found`);
    });
  });

  describe('addToStock', () => {
    it('should add a medicine to a stock', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: mockMedicine.id });
      mockStockRepository.save.mockResolvedValue({ id: mockMedicine.id });
      expect(await service.addToStock(mockMedicine, 5)).toEqual({ success: true });
    });

    it('should throw an error if the medicine does not exist', async () => {
      mockStockRepository.findOne.mockImplementation((id) => {
        throw new NotFoundException(`Medicine with id ${mockMedicine.id} not found`);
      });
      await expect(service.addToStock(mockMedicine, 5)).rejects.toThrow(`Medicine with id ${mockMedicine.id} not found`);
    });
  });

  describe('removeFromStock', () => {
    it('should remove medicines from a stock', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: mockMedicine.id });
      mockStockRepository.delete.mockResolvedValue({ affected: 1 });
      expect(await service.removeFromStock(mockMedicine.id, 3)).toEqual({ success: true });
    });

    it('should throw an error if the medicine does not exist', async () => {
      mockStockRepository.findOne.mockImplementation((id) => {
        throw new NotFoundException(`Medicine with id ${mockMedicine.id} not found`);
      });
      await expect(service.removeFromStock(mockMedicine.id, 3)).rejects.toThrow(`Medicine with id ${mockMedicine.id} not found`);
    });

    it('should throw an error if the medicine quantity is not enough to remove', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: mockMedicine.id, quantity: 2 });
      await expect(service.removeFromStock(mockMedicine.id, 3)).rejects.toThrow('Not enough products in stock for medicine with id ' + mockMedicine.id);
    });
  });
});
