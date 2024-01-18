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
    it('should create a new stock', async () => {});
  });

  describe('remove', () => {
    it('should delete a stock', async () => {});
    
    it('should throw an error if stock does not exist', async () => {});
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
