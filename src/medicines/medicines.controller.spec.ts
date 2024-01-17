import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { Medicine } from './entities/medicine.entity';

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
const medicineToUpdate: CreateMedicineDto = {
  name: 'Paracetamol',
  description: 'Medicine for headaches',
  manufacturer: 'Bayer',
  batch: 1234,
  type: 'Tablet',
  posology: 'Take one tablet every 8 hours',
  indications: 'Headaches',
  contraindications: 'None',
  stockQuantity: 20,
};

describe('MedicinesController', () => {
  let controller: MedicinesController;
  let service: Partial<MedicinesService>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicinesController],
      providers: [{ provide: MedicinesService, useValue: service }],
    }).compile();

    controller = module.get<MedicinesController>(MedicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a medicine', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(medicineReturn);

      const result = await controller.create(medicineToCreate);

      expect(result).toEqual(medicineReturn);
    });
  });

  describe('findAll', () => {
    it('should return an array of medicines', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([medicineReturn]);

      const result = await controller.findAll();

      expect(result).toEqual([medicineReturn]);
    });
  });

  describe('findOne', () => {
    it('should return a medicine', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(medicineReturn);

      const result = await controller.findOne('1');

      expect(result).toEqual(medicineReturn);
    });
  });

  describe('update', () => {
    it('should update a medicine', async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ raw: [], affected: 1, generatedMaps: [] });

      const result = await controller.update('1', medicineToUpdate);

      expect(result).toEqual({ raw: [], affected: 1, generatedMaps: [] });
    });
  });

  describe('remove', () => {
    it('should remove a medicine', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ raw: [], affected: 1 });

      const result = await controller.remove('1');

      expect(result).toEqual({ raw: [], affected: 1 });
    });
  });
});
