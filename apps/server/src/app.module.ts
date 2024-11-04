import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { renameSync } from 'node:fs';

const execAsync = promisify(exec);

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      await execAsync('yarn bundle:openapi');
      renameSync('./openapi/bundled.yaml', './dist/openapi/bundled.yaml');
      console.log('[OpenAPI] schema bundled successfully');
    } catch (error) {
      console.error(error);
    }
  }
}
