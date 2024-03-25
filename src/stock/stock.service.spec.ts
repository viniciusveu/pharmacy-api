import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { NotFoundException } from '@nestjs/common';
import { Medicine } from 'src/medicines/entities/medicine.entity';
import { SUCCESS_RESPONSE } from '../utils/SuccessResponse';

const mockMedicine: Medicine = {
  id: 'ac36d71b-280a-4c59-9e31-e7c575d30534',
  name: 'Paracetamol',
  description: 'Medicine for headaches',
  manufacturer: 'Bayer',
  batch: 1235,
  type: 'Tablet',
  posology: 'Take one tablet every 8 hours',
  indications: 'Headaches',
  contraindications: 'None',
  stock: [],
  groups: [],
};

const mockStock: Stock = {
  id: "aae2e67b-1b6d-496b-845d-b42ef9573064",
  medicineId: "5f6d9d5b-3a6b-4a6d-9d5b-3a6d9d5b3a6d",
  medicine: mockMedicine,
  quantity: 0,
  category: "default"
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

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new stock and return it', async () => {
      const newStock = new Stock();
      mockStockRepository.save.mockResolvedValue(newStock);

      const result = await service.create(newStock);

      expect(result).toBe(newStock);
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

      expect(await service.remove('1')).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if stock does not exist', async () => {
      mockStockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.remove('1')).rejects.toThrow('Stock entry for medicine with id 1 not found');
    });

    it('should throw an error when removal fails', async () => {
      mockStockRepository.delete.mockRejectedValue(
        new Error('Stock entry for medicine with id non-existent-id not found'),
      );

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        'Stock entry for medicine with id non-existent-id not found',
      );
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
      mockStockRepository.findOne.mockImplementation(() => {
        throw new NotFoundException(`Stock not found`);
      });
      await expect(service.findOne('1')).rejects.toThrow(`Stock not found`);
    });
  });

  describe('update', () => {
    it('should update a stock of a medicine', async () => {
      const stockToCreate = new Stock()
      mockStockRepository.findOne.mockResolvedValue(mockStock);
      mockStockRepository.save.mockResolvedValue(mockStock);

      const result = await service.update(stockToCreate.medicineId, stockToCreate);

      expect(result).toEqual(SUCCESS_RESPONSE);
    })
  })

  describe('addToStock', () => {
    it('should add a medicine to a stock', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: mockMedicine.id });
      mockStockRepository.save.mockResolvedValue({ id: mockMedicine.id });
      expect(await service.addToStock(mockMedicine, 5)).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if medicine stock does not exist', async () => {
      mockStockRepository.findOne.mockResolvedValue(undefined);
      jest.spyOn(mockStockRepository, 'save').mockImplementation(() => {});
      
      await expect(service.addToStock(mockMedicine, 5)).rejects.toThrow(
        `Stock entry for medicine with id ${mockMedicine.id} not found`,
      );
      expect(mockStockRepository.save).toHaveBeenCalledTimes(0)
    });

    it('should handle error thrown by the repository', async () => {
      mockStockRepository.findOne.mockImplementation(() => {
        throw new NotFoundException(`Database error`);
      });
      await expect(service.addToStock(mockMedicine, 5)).rejects.toThrow(
        `Database error`,
      );
    });
  });

  describe('removeFromStock', () => {
    it('should remove medicines from a stock', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: mockMedicine.id });
      mockStockRepository.delete.mockResolvedValue({ affected: 1 });
      expect(await service.removeFromStock(mockMedicine.id, 3)).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if the medicine does not exist', async () => {
      mockStockRepository.findOne.mockImplementation(() => {
        throw new NotFoundException(`Medicine with id ${mockMedicine.id} not found`);
      });
      await expect(service.removeFromStock(mockMedicine.id, 3)).rejects.toThrow(
        `Medicine with id ${mockMedicine.id} not found`,
      );
    });

    it('should throw an error if the medicine quantity is not enough to remove', async () => {
      mockStockRepository.findOne.mockResolvedValue({ id: mockMedicine.id, quantity: 2 });
      await expect(service.removeFromStock(mockMedicine.id, 3)).rejects.toThrow(
        'Not enough products in stock for medicine with id ' + mockMedicine.id,
      );
    });
  });
});
