import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn'],
      errorFormat: 'pretty'
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('[MySQL] Database connected successfully');
    } catch (error) {
      console.error('[MySQL] Error connecting to the database:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
