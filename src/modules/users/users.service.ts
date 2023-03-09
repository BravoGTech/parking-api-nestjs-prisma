import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { CreateUserDto, UserDataWithNoPassword } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance, plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = hashSync(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        isAdmin: false,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return plainToInstance(UserDataWithNoPassword, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        sales: true,
      },
    });
    const { password, isAdmin, ...rest } = user;

    return rest;
  }

  async findProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { sales: true },
    });

    const { password, ...rest } = user;
    return rest;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });

    return plainToInstance(UserDataWithNoPassword, user);
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
