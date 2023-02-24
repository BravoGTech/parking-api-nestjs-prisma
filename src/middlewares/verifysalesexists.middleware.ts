import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerifySalsExistsMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const sale = await this.prisma.sales.findUnique({
      where: {
        id,
      },
    });

    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    next();
  }
}
