import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './login.DTO';
import * as jwt from 'jsonwebtoken';
import { compare, compareSync } from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(data: LoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new HttpException('Creditals not match1', HttpStatus.BAD_REQUEST);
    }

    const verifyPassword = await compare(data.password, user.password);

    if (!verifyPassword) {
      throw new HttpException('Creditals not match', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign(
      {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: '5h', subject: user.id },
    );

    return { token };
  }
}
