import { Test, TestingModule } from '@nestjs/testing';
import { ParkingInfoController } from './parking-info.controller';
import { ParkingInfoService } from './parking-info.service';

describe('ParkingInfoController', () => {
  let controller: ParkingInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingInfoController],
      providers: [ParkingInfoService],
    }).compile();

    controller = module.get<ParkingInfoController>(ParkingInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
