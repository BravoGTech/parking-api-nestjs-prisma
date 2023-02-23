import { Module } from '@nestjs/common';
import { ParkingInfoService } from './parking-info.service';
import { ParkingInfoController } from './parking-info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ParkingInfoController],
  providers: [ParkingInfoService, PrismaService],
})
export class ParkingInfoModule {}
