import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsService } from './medicine-groups.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicineGroup } from './entities/medicine-group.entity';
import { MedicinesService } from '../medicines/medicines.service';

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
    findAll: jest.fn(),
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
    it('should create a new group', async () => {});
    it('should throw an error if some medicine does not exist', async () => {});
    it('should throw an error if group already exists', async () => {});
  });

  describe('findAll', () => {
    it('should return all groups', async () => {});
  });

  describe('findOne', () => {
    it('should return a group', async () => {});
  });

  describe('update', () => {
    it('should update a group', async () => {});
    it('should throw an error if group name already exists', async () => {});
  });

  describe('remove', () => {
    it('should remove a group', async () => {});
  });

  describe('addMedicinesToGroup', () => {
    it('should add medications to a group', async () => {});
    it('should throw an error if group does not exist', async () => {});
    it('should throw an error if some medicine does not exist', async () => {});
  });

  describe('removeMedicinesFromGroup', () => {
    it('should remove medicines from a group', async () => {});
    it('should throw an error if group does not exist', async () => {});
  });
});
