import { Test, TestingModule } from '@nestjs/testing';
import { MadicinesController } from './madicines.controller';
import { MadicinesService } from './madicines.service';

describe('MadicinesController', () => {
  let controller: MadicinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MadicinesController],
      providers: [MadicinesService],
    }).compile();

    controller = module.get<MadicinesController>(MadicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
