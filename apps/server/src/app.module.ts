import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
