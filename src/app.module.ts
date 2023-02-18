import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './src/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [PrismaModule, UsersModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
