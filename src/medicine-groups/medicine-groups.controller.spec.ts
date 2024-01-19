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
  let service: Partial<MedicineGroupsService>;

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
