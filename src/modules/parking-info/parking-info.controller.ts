import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ParkingInfoService } from './parking-info.service';
import { CreateParkingInfoDto } from './dto/create-parking-info.dto';
import { UpdateParkingInfoDto } from './dto/update-parking-info.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { OnlyAdminGuard } from 'src/guard/onlyadmin.guard';
import { UsePipes } from '@nestjs/common/decorators';

@Controller('parking-info')
export class ParkingInfoController {
  constructor(private readonly parkingInfoService: ParkingInfoService) {}

  @Post()
  @UseGuards(AuthGuard, OnlyAdminGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  create(@Body() createParkingInfoDto: CreateParkingInfoDto) {
    return this.parkingInfoService.create(createParkingInfoDto);
  }

  @Get()
  findAll() {
    return this.parkingInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingInfoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard, OnlyAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateParkingInfoDto: UpdateParkingInfoDto,
  ) {
    return this.parkingInfoService.update(+id, updateParkingInfoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OnlyAdminGuard)
  remove(@Param('id') id: string) {
    return this.parkingInfoService.remove(+id);
  }
}
