import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';

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
        password: hashedPassword,
      },
    });

    return plainToClass(CreateUserDto, newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return plainToInstance(CreateUserDto, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: { sales: true },
    });
    return plainToClass(CreateUserDto, user);
  }

  async findProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { sales: true },
    });
    return plainToClass(CreateUserDto, user);
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

    return plainToClass(UpdateUserDto, user);
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
