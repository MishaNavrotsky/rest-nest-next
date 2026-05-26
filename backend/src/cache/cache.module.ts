import { Global, Module, Inject, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import { CACHE_CLIENT } from './cache.constants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CACHE_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.getOrThrow<string>('REDIS_HOST'),
          port: configService.getOrThrow<number>('REDIS_PORT'),
          db: configService.getOrThrow<number>('REDIS_DB'),
          password: configService.getOrThrow<string>('REDIS_PASSWORD'),
          maxRetriesPerRequest: 3,
        });
      },
    },
  ],
  exports: [CACHE_CLIENT],
})
export class CacheModule implements OnApplicationShutdown {
  constructor(@Inject(CACHE_CLIENT) private readonly redisClient: Redis) {}

  async onApplicationShutdown() {
    await this.redisClient.quit();
  }
}
