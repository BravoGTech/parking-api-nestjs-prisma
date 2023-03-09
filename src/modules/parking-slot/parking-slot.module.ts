import { Module } from '@nestjs/common';
import { ParkingSlotService } from './parking-slot.service';
import { ParkingSlotController } from './parking-slot.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ParkingSlotController],
  providers: [ParkingSlotService, PrismaService],
})
export class ParkingSlotModule {}
