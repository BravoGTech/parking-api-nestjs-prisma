import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { VerifyUserExistsMiddleware } from './middlewares/verifyuserexists.middleware';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingInfoModule } from './modules/parking-info/parking-info.module';
import { ParkingSlotModule } from './modules/parking-slot/parking-slot.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    LoginModule,
    ParkingInfoModule,
    ParkingSlotModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyUserExistsMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.ALL });
  }
}
