import { HttpException, HttpStatus } from '@nestjs/common';
/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotNumberAlreadyExistsMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const spotNumber = req.body.number;

    const spot = await this.prisma.parkingSlot.findFirst({
      where: {
        number: spotNumber,
      },
    });

    if (spot) {
      throw new HttpException('Vaga ja existente', HttpStatus.CONFLICT);
    }

    next();
  }
}
