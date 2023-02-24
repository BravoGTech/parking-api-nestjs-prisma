import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}
  async create(createSaleDto: CreateSaleDto, userId: string) {
    const { spotNumber, ...rest } = createSaleDto;

    const spot = await this.prisma.parkingSlot.findFirst({
      where: {
        number: spotNumber,
      },
    });

    if (!spot.isAvaliable) {
      throw new HttpException('Vaga ja ocupada', HttpStatus.CONFLICT);
    }

    const newSale = await this.prisma.sales.create({
      data: {
        ...rest,
        parkingSlot: { connect: { id: spot.id } },
        user: { connect: { id: userId } },
      },
    });

    await this.prisma.parkingSlot.update({
      where: {
        id: spot.id,
      },
      data: {
        isAvaliable: false,
      },
    });

    return newSale;
  }

  async findAll() {
    const sales = await this.prisma.sales.findMany();

    return sales;
  }

  async findOne(id: string) {
    const sale = await this.prisma.sales.findUnique({
      where: {
        id: id,
      },
      include: {
        parkingSlot: true,
        user: true,
      },
    });

    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const { paymentMethod } = updateSaleDto;

    const paymentAvalible = ['CC', 'CD', 'PIX', 'DIN'];

    const validPayment = paymentAvalible.includes(paymentMethod);

    if (!validPayment) {
      throw new HttpException(
        'The valid Keys are: CC, CD, PIX, DIN',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sale = await this.prisma.sales.findUnique({
      where: {
        id,
      },
    });

    const { parkingSlotId, checkinTime } = sale;

    const ParkingSlot = await this.prisma.parkingSlot.findUnique({
      where: {
        id: parkingSlotId,
      },
    });

    const { parkingInfoId } = ParkingSlot;

    const parkingInfo = await this.prisma.parkingInfo.findUnique({
      where: {
        id: parkingInfoId,
      },
    });

    const { priceByHour } = parkingInfo;

    const checkIn = new Date(checkinTime);
    const checkout = new Date();

    const diffInMilliseconds = checkout.getTime() - checkIn.getTime();

    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    const newPrice = diffInHours * +priceByHour;

    const update = await this.prisma.sales.update({
      where: {
        id: id,
      },
      data: {
        checkoutTime: checkout,
        price: newPrice,
        paymentMethod: updateSaleDto.paymentMethod,
      },
    });

    return update;
  }

  async remove(id: string) {
    await this.prisma.sales.delete({
      where: {
        id: id,
      },
    });
  }
}
