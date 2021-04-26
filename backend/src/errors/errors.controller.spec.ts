import { Test, TestingModule } from '@nestjs/testing';
import { ErrorsController } from './errors.controller';

describe('ErrorsController', () => {
  let controller: ErrorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorsController],
    }).compile();

    controller = module.get<ErrorsController>(ErrorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
