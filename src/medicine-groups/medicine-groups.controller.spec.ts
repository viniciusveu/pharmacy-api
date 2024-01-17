import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsController } from './medicine-groups.controller';
import { MedicineGroupsService } from './medicine-groups.service';

describe('MedicineGroupsController', () => {
  let controller: MedicineGroupsController;
  let service: Partial<MedicineGroupsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineGroupsController],
      providers: [{ provide: MedicineGroupsService, useValue: service }],
    }).compile();

    controller = module.get<MedicineGroupsController>(MedicineGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
