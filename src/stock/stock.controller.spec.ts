import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { MedicinesService } from '../medicines/medicines.service';

const stockReturn = {
  medicineId: '1',
  quantity: 10,
  id: '1',
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
const stockToCreate = {
  medicineId: '1',
  quantity: 10,
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
      addProductsToStock: jest.fn(),
      removeProductsFromStock: jest.fn(),
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
