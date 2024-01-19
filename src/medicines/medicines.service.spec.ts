import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesService } from './medicines.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { StockService } from '../stock/stock.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

const medicineToUpdated: CreateMedicineDto = {
  name: 'Paracetamol New',
  description: 'Medicine for headaches',
  manufacturer: 'Bayer',
  batch: 1234,
  type: 'Tablet',
  posology: 'Take one tablet every 8 hours',
  indications: 'Headaches',
  contraindications: 'None',
};
const medicineToCreate: CreateMedicineDto = {
  name: 'Paracetamol',
  description: 'Medicine for headaches',
  manufacturer: 'Bayer',
  batch: 1234,
  type: 'Tablet',
  posology: 'Take one tablet every 8 hours',
  indications: 'Headaches',
  contraindications: 'None',
};
const medicineReturn: Medicine = {
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
};

describe('MedicinesService', () => {
  let service: MedicinesService;
  const mockMedicineRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };
  const mockStockService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicinesService,
        {
          provide: getRepositoryToken(Medicine),
          useValue: mockMedicineRepository,
        },
        {
          provide: StockService,
          useValue: mockStockService,
        },
      ],
    }).compile();

    service = module.get<MedicinesService>(MedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a medicine and its stock', async () => {
      jest
        .spyOn(mockMedicineRepository, 'save')
        .mockImplementation(() => medicineReturn);

      const result = await service.create(medicineToCreate);

      expect(result).toEqual(medicineReturn);
    });

    it('should throw an error if this medicine name already exists', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockImplementation(() => medicineReturn);

      await expect(service.create(medicineToCreate)).rejects.toThrow('Medicine already exists');
    });
  });

  describe('findAll', () => {
    it('should return an array of medicines', async () => {
      jest
        .spyOn(mockMedicineRepository, 'find')
        .mockImplementation(() => [medicineReturn]);

      const result = await service.findAll();

      expect(result).toEqual([medicineReturn]);
    });
  });

  describe('findOne', () => {
    it('should return a medicine', async () => {
      jest
        .spyOn(mockMedicineRepository, 'findOne')
        .mockImplementation(() => medicineReturn);

      const result = await service.findOne(medicineReturn.id);

      expect(result).toEqual(medicineReturn);
    });
  });

  describe('update', () => {
    it('should update a medicine', async () => {
      const updatedMedicine = { ...medicineReturn, name: 'Paracetamol Updated' };
      jest.spyOn(mockMedicineRepository, 'count').mockResolvedValue(1);
      jest.spyOn(mockMedicineRepository, 'update').mockResolvedValue(updatedMedicine);

      const result = await service.update(medicineReturn.id, updatedMedicine);

      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should delete a medicine and its stock', async () => {
      jest
        .spyOn(mockMedicineRepository, 'delete')
        .mockImplementation(() => medicineReturn);

      const result = await service.remove(medicineReturn.id);

      expect(result).toEqual({ success: true });
    });
  });
});
