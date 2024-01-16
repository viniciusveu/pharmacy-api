import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsController } from './medicine-groups.controller';
import { MedicineGroupsService } from './medicine-groups.service';

describe('MedicineGroupsController', () => {
  let controller: MedicineGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineGroupsController],
      providers: [MedicineGroupsService],
    }).compile();

    controller = module.get<MedicineGroupsController>(MedicineGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
