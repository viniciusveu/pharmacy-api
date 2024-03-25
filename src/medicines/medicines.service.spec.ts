import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesService } from './medicines.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { StockService } from '../stock/stock.service';
import { SUCCESS_RESPONSE } from '../utils/SuccessResponse';

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
  stockQuantity: 10,
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a medicine and its stock when medicine does not exist', async () => {
      // Arrange
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(mockStockService, 'create').mockResolvedValue(null);
      jest.spyOn(mockMedicineRepository, 'save').mockResolvedValue(medicineReturn);

      // Act
      const result = await service.create(medicineToCreate);

      // Assert
      expect(mockMedicineRepository.findOne).toHaveBeenCalledWith({ where: { name: medicineToCreate.name } });
      expect(mockMedicineRepository.save).toHaveBeenCalledWith(medicineToCreate);
      expect(mockStockService.create).toHaveBeenCalledWith({ medicineId: medicineReturn.id, quantity: medicineToCreate.stockQuantity });
      expect(result).toEqual(medicineReturn);
    });

    it('should call stockService.create with default quantity if stockQuantity is not provided', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(mockStockService, 'create').mockResolvedValue(null);
      jest.spyOn(mockMedicineRepository, 'save').mockResolvedValue(medicineReturn);
      const medicineToCreateWithoutStockQuantity = {
        ...medicineToCreate,
        stockQuantity: undefined,
      };

      await service.create(medicineToCreateWithoutStockQuantity);

      expect(mockStockService.create).toHaveBeenCalledWith({ medicineId: medicineReturn.id, quantity: 0 });
    });

    it('should throw an error if this medicine name already exists', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);
      jest.spyOn(mockMedicineRepository, 'save').mockImplementation(() => {});

      await expect(service.create(medicineToCreate)).rejects.toThrow('Medicine already exists');

      expect(mockMedicineRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockMedicineRepository.save).toHaveBeenCalledTimes(0);
    });

    it('should handle errors thrown by the repository', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockRejectedValue(new Error('Database error'));

      await expect(service.create(medicineToCreate)).rejects.toThrow('Database error');
    });

    it('should handle errors thrown by the stock service', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(mockMedicineRepository, 'save').mockResolvedValue(medicineReturn);
      jest.spyOn(mockStockService, 'create').mockRejectedValue(new Error('Stock service error'));

      await expect(service.create(medicineToCreate)).rejects.toThrow('Stock service error');
    });
  });

  describe('findAll', () => {
    it('should return an array of medicines', async () => {
      const stubFind = jest.fn().mockResolvedValue([medicineReturn])
      jest.spyOn(mockMedicineRepository, 'find').mockImplementation(stubFind);

      const result = await service.findAll();

      expect(result).toEqual([medicineReturn]);
    });

    it('should handle errors thrown by the repository', async () => {
      jest.spyOn(mockMedicineRepository, 'find').mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow('Database error');
    });
  });

  describe('findOne', () => {
    it('should return a medicine', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);

      const result = await service.findOne(medicineReturn.id);

      expect(result).toEqual(medicineReturn);
    });

    it('should throw NotFoundException when the medicine is not found', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(medicineReturn.id)).rejects.toThrow(
        `Medicine with id ${medicineReturn.id} not found`,
      );
    });
  });

  describe('update', () => {
    it('should update a medicine', async () => {
      const updatedMedicine = {
        ...medicineReturn,
        name: 'Paracetamol Updated',
      };
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);
      jest.spyOn(mockMedicineRepository, 'update').mockResolvedValue(updatedMedicine);

      const result = await service.update(medicineReturn.id, updatedMedicine);

      expect(result).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if the medicine do not exists', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update('1', medicineToUpdated)).rejects.toThrow(
        `Medicine with id ${medicineReturn.id} not found`,
      );
    });

    it('should handle errors thrown by the repository', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);
      jest.spyOn(mockMedicineRepository, 'update').mockRejectedValue(new Error('Database error'));

      await expect(service.update('1', medicineToUpdated)).rejects.toThrow('Database error');
    });
  });

  describe('remove', () => {
    it('should delete a medicine and its stock', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);
      jest.spyOn(mockMedicineRepository, 'delete').mockImplementation(() => medicineReturn);

      const result = await service.remove(medicineReturn.id);

      expect(result).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if the medicine do not exists', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(`Medicine with id ${medicineReturn.id} not found`);
    });

    it('should handle errors thrown by the repository', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);
      jest.spyOn(mockMedicineRepository, 'delete').mockRejectedValue(new Error('Database error'));

      await expect(service.remove('1')).rejects.toThrow('Database error');
    });
  });

  describe('checkIfExists', () => {
    it('should return false when medicine with same name does not exist', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(medicineReturn);

      const result = await service.checkIfExists(medicineReturn.name);

      expect(mockMedicineRepository.findOne).toHaveBeenCalledWith({ where: { name: medicineReturn.name }})
      expect(result).toBe(false);
    });

    it('should return true when medicine with same name exists', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockResolvedValue(null);

      const result = await service.checkIfExists(medicineReturn.name);

      expect(result).toBe(true);
    });

    it('should handle error thown by the respository', async () => {
      jest.spyOn(mockMedicineRepository, 'findOne').mockRejectedValue(new Error('Database error'));

      await expect(service.checkIfExists(medicineReturn.name)).rejects.toThrow('Database error');
    });
  });
});
