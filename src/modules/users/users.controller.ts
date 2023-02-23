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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { IsAdminOrOwnerGuard } from 'src/guard/isAdminOrOwner.guard';
import { OnlyAdminGuard } from 'src/guard/onlyadmin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard, OnlyAdminGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, IsAdminOrOwnerGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  findProfile(@Req() req: Request) {
    const id = req.user.id;
    return this.usersService.findProfile(id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard, IsAdminOrOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, IsAdminOrOwnerGuard)
  @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OnlyAdminGuard)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
