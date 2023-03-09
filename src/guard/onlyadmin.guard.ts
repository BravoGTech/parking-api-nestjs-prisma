import { HttpException, HttpStatus } from '@nestjs/common';
/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user.isAdmin) {
      throw new HttpException(
        'You dont have the credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
