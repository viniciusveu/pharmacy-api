import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { MedicinesService } from '../medicines/medicines.service';

const stockReturn = {
  medicineId: '1',
  quantity: 10,
  id: '1',
  category: 'default',
  medicine: {
    id: '1',
    name: 'Paracetamol',
    description: 'Medicine for headaches',
    manufacturer: 'Bayer',
    batch: 1234,
    type: 'Tablet',
    posology: 'Take one tablet every 8 hours',
    indications: 'Headaches',
    contraindications: 'None',
    groups: [],
    stock: [],
  },
};

describe('StockController', () => {
  let controller: StockController;
  let stockService: Partial<StockService>;
  let mockMedicineService: Partial<MedicinesService>;

  beforeEach(async () => {
    stockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      removeFromStock: jest.fn(),
      addToStock: jest.fn(),
    };
    mockMedicineService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: StockService,
          useValue: stockService,
        },
        {
          provide: MedicinesService,
          useValue: mockMedicineService,
        },
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of stocks', async () => {
      jest.spyOn(stockService, 'findAll').mockResolvedValue([stockReturn]);

      const result = await controller.findAll();

      expect(result).toEqual([stockReturn]);
    });
  });

  describe('findOne', () => {
    it('should return a stock', async () => {
      jest.spyOn(stockService, 'findOne').mockResolvedValue(stockReturn);

      const result = await controller.findOne('1');

      expect(result).toEqual(stockReturn);
    });

    it('should throw an error if the medicine does not exist', async () => {
      jest.spyOn(stockService, 'findOne').mockRejectedValue(new Error('Medicine not found'));

      await expect(controller.findOne('non-existent-id')).rejects.toThrow('Medicine not found');
    });
  });

  describe('addToStock', () => {
    it('should add a medicine to a stock', async () => {
      jest.spyOn(stockService, 'addToStock').mockResolvedValue(null);

      await expect(controller.addToStock('1', 5)).resolves.not.toThrow();
    });

    it('should throw an error if the medicine does not exist', async () => {
      jest.spyOn(stockService, 'addToStock').mockRejectedValue(new Error('Medicine not found'));

      await expect(controller.addToStock('non-existent-id', 5)).rejects.toThrow('Medicine not found');
    });
  });

  describe('removeFromStock', () => {
    it('should remove medicines from a stock', async () => {
      jest.spyOn(stockService, 'removeFromStock').mockResolvedValue(null);

      await expect(controller.removeFromStock('1', 3)).resolves.not.toThrow();
    });

    it('should throw an error if the medicine does not exist', async () => {
      jest.spyOn(stockService, 'removeFromStock').mockRejectedValue(new Error('Medicine not found'));

      await expect(controller.removeFromStock('non-existent-id', 3)).rejects.toThrow('Medicine not found');
    });
  });

});
