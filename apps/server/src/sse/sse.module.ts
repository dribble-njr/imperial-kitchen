import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SSEController } from './sse.controller';
import { SSEService } from './sse.service';

@Module({
  imports: [AuthModule],
  controllers: [SSEController],
  providers: [SSEService],
  exports: [SSEService]
})
export class SSEModule {}
