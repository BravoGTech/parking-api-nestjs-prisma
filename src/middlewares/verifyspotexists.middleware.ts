import { HttpException, HttpStatus } from '@nestjs/common';
/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerifySpotExistsMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const numberSpot = req.body.spotNumber;

    const spot = await this.prisma.parkingSlot.findFirst({
      where: {
        number: numberSpot,
      },
    });

    if (!spot) {
      throw new HttpException('Vaga não existe', HttpStatus.NOT_FOUND);
    }

    next();
  }
}
