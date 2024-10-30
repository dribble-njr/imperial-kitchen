import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import config from 'src/config';

@Injectable()
export class RedisService {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      password: config.REDIS_PASSWORD,
      socket: {
        host: 'redis-13502.c261.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 13502
      }
    });

    this.client.on('error', this.onError.bind(this));
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('ready', () => {
      this.isConnected = true;
    });

    this.client.on('end', () => {
      this.isConnected = false;
    });
  }

  onError(error: Error) {
    console.error('Redis Client Error:', error);
  }

  onConnect() {
    console.log('Connected to Redis!');
  }

  async set(key: string, value: string | number, expire?: number) {
    await this.ensureConnected();
    return new Promise((resolve) => {
      this.client.set(key, value);
      if (expire) {
        this.client.expire(key, expire);
      }
      resolve(key);
    });
  }

  async get(key: string) {
    await this.ensureConnected();
    return new Promise((resolve) => {
      resolve(this.client.get(key));
    });
  }

  async ensureConnected() {
    if (!this.isConnected) {
      return new Promise((resolve, reject) => {
        this.client.once('ready', resolve);
        this.client.once('error', reject);
        this.client.connect();
      });
    }
  }
}
