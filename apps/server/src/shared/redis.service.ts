import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import config from 'src/config';

@Injectable()
export class RedisService {
  private client: RedisClientType;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;
  private readonly reconnectInterval: number = 5000; // 5秒

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    this.client = createClient({
      password: config.REDIS_PASSWORD,
      socket: {
        host: config.REDIS_URL,
        port: config.REDIS_PORT,
        connectTimeout: 10000,
        keepAlive: 5000,
        reconnectStrategy: (retries) => {
          if (retries > this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached, giving up');
            return new Error('Max reconnection attempts reached');
          }
          return this.reconnectInterval;
        }
      }
    });

    this.client.on('error', this.onError.bind(this));
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('ready', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.client.on('end', () => {
      this.isConnected = false;
    });

    this.client.connect().catch((err) => {
      console.error('Initial connection failed:', err);
    });
  }

  onError(error: Error) {
    console.error('Redis Client Error:', error);
    this.reconnectAttempts++;
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
      try {
        await this.client.connect();
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Redis connection timeout'));
          }, 5000);

          this.client.once('ready', () => {
            clearTimeout(timeout);
            resolve(true);
          });

          this.client.once('error', (err) => {
            clearTimeout(timeout);
            reject(err);
          });
        });
      } catch (error) {
        console.error('Failed to ensure Redis connection:', error);
        throw error;
      }
    }
  }
}
