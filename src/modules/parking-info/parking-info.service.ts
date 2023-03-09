import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParkingInfoDto } from './dto/create-parking-info.dto';
import { UpdateParkingInfoDto } from './dto/update-parking-info.dto';

@Injectable()
export class ParkingInfoService {
  constructor(private prisma: PrismaService) {}
  async create(createParkingInfoDto: CreateParkingInfoDto) {
    const parkingInfo = await this.prisma.parkingInfo.create({
      data: {
        ...createParkingInfoDto,
      },
    });
    return parkingInfo;
  }

  async findAll() {
    const parkingInfo = await this.prisma.parkingInfo.findMany();

    return parkingInfo;
  }

  async findOne(id: number) {
    const parkingInfo = await this.prisma.parkingInfo.findUnique({
      where: {
        id,
      },
      include: {
        parkingSlot: true,
      },
    });

    return parkingInfo;
  }

  async update(id: number, updateParkingInfoDto: UpdateParkingInfoDto) {
    const parkingInfo = await this.prisma.parkingInfo.update({
      where: {
        id: id,
      },
      data: {
        ...updateParkingInfoDto,
      },
    });
    return parkingInfo;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingInfo`;
  }
}
