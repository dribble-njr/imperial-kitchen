import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { MailService } from './mail.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [RedisService, MailService, PrismaService],
  exports: [RedisService, MailService, PrismaService]
})
export class SharedModule {}
