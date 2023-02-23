import { Test, TestingModule } from '@nestjs/testing';
import { ParkingInfoService } from './parking-info.service';

describe('ParkingInfoService', () => {
  let service: ParkingInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingInfoService],
    }).compile();

    service = module.get<ParkingInfoService>(ParkingInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
