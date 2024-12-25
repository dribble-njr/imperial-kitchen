import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { SSEModule } from './sse/sse.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [SharedModule, UserModule, AuthModule, TagModule, SSEModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
