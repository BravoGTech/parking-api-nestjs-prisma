import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminOrOwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const idParams = request.params.id;

    if (!request.user.isAdmin && idParams !== request.user.id) {
      throw new HttpException(
        'You dont have the credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
