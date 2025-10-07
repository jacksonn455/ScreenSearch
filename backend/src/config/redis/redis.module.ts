import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: require('cache-manager-redis-store').redisStore,
        host: configService.get('REDIS_HOST') || 'localhost',
        port: configService.get('REDIS_PORT') || 6379,
        ttl: 60 * 60 * 24,
        max: 1000,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}