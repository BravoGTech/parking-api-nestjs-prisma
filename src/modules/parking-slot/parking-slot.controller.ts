import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ParkingSlotService } from './parking-slot.service';
import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking-slot.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { OnlyAdminGuard } from 'src/guard/onlyadmin.guard';
import { IsAdminOrOwnerGuard } from 'src/guard/isAdminOrOwner.guard';

@Controller('parking-slot')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}

  @Post()
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard, OnlyAdminGuard)
  @HttpCode(201)
  create(@Body() createParkingSlotDto: CreateParkingSlotDto) {
    return this.parkingSlotService.create(createParkingSlotDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.parkingSlotService.findAll();
  }

  @Get(':number')
  @UseGuards(AuthGuard, IsAdminOrOwnerGuard)
  findOne(@Param('number') number: string) {
    return this.parkingSlotService.findOne(+number);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  update(
    @Param('id') id: string,
    @Body() updateParkingSlotDto: UpdateParkingSlotDto,
  ) {
    return this.parkingSlotService.update(id, updateParkingSlotDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard, OnlyAdminGuard)
  remove(@Param('id') id: string) {
    return this.parkingSlotService.remove(id);
  }
}
