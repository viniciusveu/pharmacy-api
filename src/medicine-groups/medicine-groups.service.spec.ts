import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsService } from './medicine-groups.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicineGroup } from './entities/medicine-group.entity';
import { MedicinesService } from '../medicines/medicines.service';
import { Medicine } from 'src/medicines/entities/medicine.entity';
import { CreateMedicineGroupDto } from './dto/create-medicine-group.dto';
import { NotFoundException } from '@nestjs/common';

const mockMedicine: Medicine = {
  "id": "ac36d71b-280a-4c59-9e31-e7c575d30534",
  "name": "Paracetamol",
  "description": "Medicine for headaches",
  "manufacturer": "Bayer",
  "batch": 1235,
  "type": "Tablet",
  "posology": "Take one tablet every 8 hours",
  "indications": "Headaches",
  "contraindications": "None",
  "stock": [],
  "groups": []
}
const mockGroup: MedicineGroup = {
  "id": "ac36d71b-280a-4c59-9e31-e7c575d30534",
  "name": "Antibiotics",
  "medicines": [mockMedicine],
}
const mockFindoneGroup: MedicineGroup = {
  "id": "ac36d71b-280a-4c59-9e31-e7c575d30534",
  "name": "Antibiotics",
  "medicines": [{
    "id": "ac36d71b-280a-4c59-9e31-e7c575d30534",
    "name": "Paracetamol",
    "description": "Medicine for headaches",
    "manufacturer": "Bayer",
    "batch": 1235,
    "type": "Tablet",
    "posology": "Take one tablet every 8 hours",
    "indications": "Headaches",
    "contraindications": "None",
    "stock": [],
    "groups": []
  }],
}
const mockGroupDto: CreateMedicineGroupDto = {
  "name": "Antibiotics",
  "medicineIds": [mockMedicine.id]
}

describe('MedicineGroupsService', () => {
  let service: MedicineGroupsService;
  const mockMedicineGroupRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mockMedicineService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineGroupsService,
        {
          provide: getRepositoryToken(MedicineGroup),
          useValue: mockMedicineGroupRepository,
        },
        {
          provide: MedicinesService,
          useValue: mockMedicineService,
        },
      ],
    }).compile();

    service = module.get<MedicineGroupsService>(MedicineGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new group', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(mockMedicineService, 'findOne').mockResolvedValue(mockMedicine);
      jest.spyOn(mockMedicineGroupRepository, 'save').mockResolvedValue(mockGroup);
      const group = await service.create(mockGroupDto);
      expect(group).toEqual(mockGroup);
    });

    it('should throw an error if some medicine does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(mockMedicineService, 'findOne').mockImplementation((id) => {
        throw new NotFoundException(`Medicine with id ${id} not found`);
      });
      await expect(service.create(mockGroupDto)).rejects.toThrow(`Medicine with id ${mockMedicine.id} not found`);
    });

    it('should throw an error if group already exists', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      await expect(service.create(mockGroupDto)).rejects.toThrow('Medicine group already exists');
    });
  });

  describe('findAll', () => {
    it('should return all groups', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'find').mockResolvedValue([mockGroup]);
      const groups = await service.findAll();
      expect(groups).toEqual([mockGroup]);
    });
  });

  describe('findOne', () => {
    it('should return a group', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      const group = await service.findOne(mockGroup.id);
      expect(group).toEqual(mockGroup);
    });
  });

  describe('update', () => {
    it('should update a group', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      jest.spyOn(mockMedicineService, 'findOne').mockResolvedValue(mockMedicine);
      jest.spyOn(mockMedicineGroupRepository, 'save').mockResolvedValue({});
      const group = await service.update(mockGroup.id, mockGroupDto);
      expect(group).toEqual({ success: true });
    });

    it('should throw an error if group does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.update(mockGroup.id, mockGroupDto)).rejects.toThrow('Medicine group not found');
    });
  });

  describe('remove', () => {
    it('should remove a group', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'delete').mockResolvedValue({ success: true });
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      const result = await service.remove(mockGroup.id);
      expect(result).toEqual({ success: true });
    });

    it('should throw an error if group does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.remove(mockGroup.id)).rejects.toThrow('Medicine group not found');
    });
  });

  describe('addMedicinesToGroup', () => {
    it('should add medications to a group', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      jest.spyOn(mockMedicineService, 'findOne').mockResolvedValue(mockMedicine);
      jest.spyOn(mockMedicineGroupRepository, 'save').mockResolvedValue(mockGroup);
      const group = await service.addMedicineToGroup(mockGroup.id, mockMedicine.id);
      expect(group).toEqual({ success: true });
    });

    it('should throw an error if group does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.addMedicineToGroup(mockGroup.id, mockMedicine.id)).rejects.toThrow('Medicine group not found');
    });

    it('should throw an error if some medicine does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      jest.spyOn(mockMedicineService, 'findOne').mockImplementation((id) => {
        throw new NotFoundException(`Medicine with id ${id} not found`);
      });
      await expect(service.addMedicineToGroup(mockGroup.id, mockMedicine.id)).rejects.toThrow(`Medicine with id ${mockMedicine.id} not found`);
    });
  });

  describe('removeMedicinesFromGroup', () => {
    it('should remove medicines from a group', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      jest.spyOn(mockMedicineService, 'findOne').mockResolvedValue(mockMedicine);
      jest.spyOn(mockMedicineGroupRepository, 'save').mockResolvedValue({});
      const group = await service.removeMedicineFromGroup(mockGroup.id, mockMedicine.id);
      expect(group).toEqual({ success: true });
    });

    it('should throw an error if group does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.removeMedicineFromGroup(mockGroup.id, mockMedicine.id)).rejects.toThrow('Medicine group not found');
    });

    it('should throw an error if group is empty', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockGroup);
      jest.spyOn(mockMedicineService, 'findOne').mockImplementation(() => {
        throw new NotFoundException('Medicine group does not have any medicine');
      });
      await expect(service.removeMedicineFromGroup(mockGroup.id, mockMedicine.id)).rejects.toThrow('Medicine group does not have any medicine');
    });

    it('should throw an error if some medicine does not exist', async () => {
      jest.spyOn(mockMedicineGroupRepository, 'findOne').mockResolvedValue(mockFindoneGroup);
      jest.spyOn(mockMedicineService, 'findOne').mockImplementation((id) => {
        throw new NotFoundException(`Medicine with id ${id} not found`);
      });
      await expect(service.removeMedicineFromGroup(mockGroup.id, mockMedicine.id)).rejects.toThrow(`Medicine with id ${mockMedicine.id} not found`);
    });
  });
});
