import { Test, TestingModule } from '@nestjs/testing';
import { MedicineGroupsService } from './medicine-groups.service';

describe('MedicineGroupsService', () => {
  let service: MedicineGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineGroupsService],
    }).compile();

    service = module.get<MedicineGroupsService>(MedicineGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
