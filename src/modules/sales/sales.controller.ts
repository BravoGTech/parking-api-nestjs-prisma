import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { OnlyAdminGuard } from 'src/guard/onlyadmin.guard';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  create(@Body() createSaleDto: CreateSaleDto, @Req() req: Request) {
    const id = req.user.id;
    return this.salesService.create(createSaleDto, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard, OnlyAdminGuard)
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
