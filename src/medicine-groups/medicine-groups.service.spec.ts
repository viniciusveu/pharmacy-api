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
});
