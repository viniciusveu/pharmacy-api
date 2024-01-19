import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsController } from './medicine-groups.controller';
import { MedicineGroupsService } from './medicine-groups.service';
import { JwtService } from '@nestjs/jwt';

class MockJwtService {
  sign() {
    return 'token';
  }
}

describe('MedicineGroupsController', () => {
  let controller: MedicineGroupsController;
  let service: Partial<MedicineGroupsService> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addMedicineToGroup: jest.fn(),
    removeMedicineFromGroup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineGroupsController],
      providers: [
        { provide: MedicineGroupsService, useValue: service },
        { provide: JwtService, useClass: MockJwtService },
      ],
    }).compile();

    controller = module.get<MedicineGroupsController>(MedicineGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new group', async () => {
      jest.spyOn(service, 'create').mockResolvedValue({
        id: "1",
        name: "Antibiotics",
        medicines: [],
      });

      expect(await controller.create({ name: 'Antibiotics', medicineIds: [] })).toEqual({
        id: "1",
        name: "Antibiotics",
        medicines: [],
      })
    });

    it('should throw an error if some medicine does not exist', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Medicines not found'));
      await expect(controller.create({ name: 'Antibiotics', medicineIds: ['1', '2'] })).rejects.toThrow('Medicines not found');
    });

    it('should throw an error if group already exists', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Group already exists'));
      await expect(controller.create({ name: 'Antibiotics', medicineIds: [] })).rejects.toThrow('Group already exists');
    });
  });

  describe('findAll', () => {
    it('should return all groups', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([
        {
          id: "1",
          name: "Antibiotics",
          medicines: [],
        },
      ]);
      expect(await controller.findAll()).toEqual([
        {
          id: "1",
          name: "Antibiotics",
          medicines: [],
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a group', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue({
        id: "1",
        name: "Antibiotics",
        medicines: [],
      });
      expect(await controller.findOne('1')).toEqual({
        id: "1",
        name: "Antibiotics",
        medicines: [],
      });
    });

  });

  describe('update', () => {
    it('should update a group', async () => {
      jest.spyOn(service, 'update').mockResolvedValue({
        success: true
      });
      expect(await controller.update('1', { name: 'Antibiotics', medicineIds: [] })).toEqual({
        success: true
      });
    });

    it('should throw an error if group name already exists', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('Group name already exists'));
      await expect(controller.update('1', { name: 'Antibiotics', medicineIds: [] })).rejects.toThrow('Group name already exists');
    });
  });

  describe('remove', () => {
    it('should remove a group', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ success: true });
      expect(await controller.remove('1')).toEqual({ success: true });
    });
  });

  describe('addMedicinesToGroup', () => {
    it('should add medications to a group', async () => {
      jest.spyOn(service, 'addMedicineToGroup').mockResolvedValue(undefined);
      expect(await controller.addMedicineToGroup('1', '2')).toEqual(undefined);
    });

    it('should throw an error if group does not exist', async () => {
      jest.spyOn(service, 'addMedicineToGroup').mockRejectedValue(new Error('Group not found'));
      await expect(controller.addMedicineToGroup('1', '2')).rejects.toThrow('Group not found');
    });

    it('should throw an error if some medicine does not exist', async () => {
      jest.spyOn(service, 'addMedicineToGroup').mockRejectedValue(new Error('Medicine not found'));
      await expect(controller.addMedicineToGroup('1', '2')).rejects.toThrow('Medicine not found');
    });
  });

  describe('removeMedicinesFromGroup', () => {
    it('should remove medicines from a group', async () => {
      jest.spyOn(service, 'removeMedicineFromGroup').mockResolvedValue(undefined);
      expect(await controller.removeMedicineFromGroup('1', '2')).toEqual(undefined);
    });

    it('should throw an error if group does not exist', async () => {
      jest.spyOn(service, 'removeMedicineFromGroup').mockRejectedValue(new Error('Group not found'));
      await expect(controller.removeMedicineFromGroup('1', '2')).rejects.toThrow('Group not found');
    });
  });
});
