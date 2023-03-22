import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking-slot.dto';

@Injectable()
export class ParkingSlotService {
  constructor(private prisma: PrismaService) {}
  async create(createParkingSlotDto: CreateParkingSlotDto) {
    const { parkingInfoId, ...rest } = createParkingSlotDto;
    const parkingInfo = await this.prisma.parkingInfo.findUnique({
      where: {
        id: parkingInfoId,
      },
    });

    if (!parkingInfo) {
      throw new HttpException(
        'Estacionamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const slot = await this.prisma.parkingSlot.create({
      data: {
        ...rest,
        parkingInfo: { connect: { id: parkingInfo.id } },
      },
    });

    return slot;
  }

  async findAll() {
    const slots = this.prisma.parkingSlot.findMany({
      include: {
        sales: true,
      },
      orderBy: {
        number: 'asc',
      },
    });

    return slots;
  }

  async findOne(spotNumber: number) {
    const slot = await this.prisma.parkingSlot.findFirst({
      where: {
        number: spotNumber,
      },
      include: {
        parkingInfo: true,
        sales: true,
      },
    });

    return slot;
  }

  async findSpot(spotId: string) {
    const spot = await this.prisma.parkingSlot.findUnique({
      where: {
        id: spotId,
      },
    });

    return spot;
  }

  async update(id: string, updateParkingSlotDto: UpdateParkingSlotDto) {
    const spot = await this.prisma.parkingSlot.update({
      where: {
        id,
      },
      data: {
        ...updateParkingSlotDto,
      },
    });

    return spot;
  }

  async remove(id: string) {
    await this.prisma.parkingSlot.delete({
      where: {
        id,
      },
    });
  }
}
