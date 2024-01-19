import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';

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
      mockStockRepository.delete.mockResolvedValue({ affected: 1 });

      expect(await service.remove('1')).toEqual({ affected: 1 });
    });

    it('should throw an error when removal fails', async () => {
      mockStockRepository.delete.mockRejectedValue(new Error('Failed to remove stock'));

      await expect(service.remove('non-existent-id')).rejects.toThrow('Failed to remove stock');
    });
  });

  describe('findAll', () => {
    it('should return an array of stocks', async () => {});
  });

  describe('findOne', () => {
    it('should return a stock', async () => {});

    it('should throw an error if the stock does not exist', async () => {});
    
    it('should throw an error if the medicine does not exist', async () => {});
  });

  describe('addToStock', () => {
    it('should add a medicine to a stock', async () => {});

    it('should throw an error if the medicine does not exist', async () => {});
  });

  describe('removeFromStock', () => {
    it('should remove medicines from a stock', async () => {});

    it('should throw an error if the medicine does not exist', async () => {});

    it('should throw an error if the medicine quantity is not enough to remove', async () => {});
  });
});
