import { Test, TestingModule } from '@nestjs/testing';
import { MadicinesService } from './madicines.service';

describe('MadicinesService', () => {
  let service: MadicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MadicinesService],
    }).compile();

    service = module.get<MadicinesService>(MadicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
