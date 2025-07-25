import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  onModuleInit() {
    const host = process.env.REDIS_HOST || '127.0.0.1';
    const port = Number(process.env.REDIS_PORT) || 6379;

    this.client = new Redis({ host, port });

    this.client.on('connect', () => {
      this.logger.log(`✅ Redisga muvaffaqiyatli ulandi (${host}:${port})`);
    });

    this.client.on('error', (err) => {
      this.logger.error('❌ Redis ulanishda xatolik:', err);
    });
  }

  async set(key: string, value: string, expiresInSec: number): Promise<void> {
    try {
      await this.client.set(key, value, 'EX', expiresInSec);
    } catch (error) {
      this.logger.error(`Redis SET xatolik: ${error.message}`, error.stack);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const result = await this.client.get(key);
      this.logger.log(`🔍 Redisdan olingan (${key}): ${result}`);
      return result;
    } catch (error) {
      this.logger.error(`Redis GET xatolik: ${error.message}`, error.stack);
      return null;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
      this.logger.log(`🗑️ Redisdan o'chirildi: ${key}`);
    } catch (error) {
      this.logger.error(`Redis DEL xatolik: ${error.message}`, error.stack);
    }
  }
}
