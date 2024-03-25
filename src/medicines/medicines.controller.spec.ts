import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { Medicine } from './entities/medicine.entity';
import { JwtService } from '@nestjs/jwt';
import { SUCCESS_RESPONSE } from '../utils/SuccessResponse';

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

class MockJwtService {
  sign() {
    return 'token';
  }
}

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
      providers: [
        { provide: MedicinesService, useValue: service },
        { provide: JwtService, useClass: MockJwtService },
      ],
    }).compile();

    controller = module.get<MedicinesController>(MedicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  beforeAll(() => {
    jest.clearAllMocks();
  })

  describe('create', () => {
    it('should create a medicine', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(medicineReturn);

      const result = await controller.create(medicineToCreate);

      expect(result).toEqual(medicineReturn);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('service error'));

      await expect(controller.create(medicineToCreate)).rejects.toThrow('service error');
    })
  });

  describe('findAll', () => {
    it('should return an array of medicines', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([medicineReturn]);

      const result = await controller.findAll();

      expect(result).toEqual([medicineReturn]);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error('service error'));

      await expect(controller.findAll()).rejects.toThrow('service error');
    })
  });

  describe('findOne', () => {
    it('should return a medicine', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(medicineReturn);

      const result = await controller.findOne('1');

      expect(result).toEqual(medicineReturn);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('service error'));

      await expect(controller.findOne('1')).rejects.toThrow('service error');
    })
  });

  describe('update', () => {
    it('should update a medicine', async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(SUCCESS_RESPONSE);

      const result = await controller.update('1', medicineToUpdate);

      expect(result).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('service error'));

      await expect(controller.update('1', medicineToUpdate)).rejects.toThrow('service error');
    })
  });

  describe('remove', () => {
    it('should remove a medicine', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(SUCCESS_RESPONSE);

      const result = await controller.remove('1');

      expect(result).toEqual(SUCCESS_RESPONSE);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error('service error'));

      await expect(controller.remove('1')).rejects.toThrow('service error');
    })
  });
});
