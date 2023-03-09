import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return false;
    }
    token = token.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (error: any, decoded: any) => {
      if (error) {
        throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
      }

      request.user = {
        email: decoded.email,
        id: decoded.sub,
        isAdmin: decoded.isAdmin,
      };
    });

    return true;
  }
}
