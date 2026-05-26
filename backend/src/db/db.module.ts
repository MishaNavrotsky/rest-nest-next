import { Global, Module, Inject, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DRIZZLE, PG_POOL } from './db.constants';
import * as usersSchema from '../users/users.schema';

const appSchema = { ...usersSchema };
export type AppDatabase = ReturnType<typeof drizzle<typeof appSchema>>;

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PG_POOL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new Pool({
          connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        });
      },
    },
    {
      provide: DRIZZLE,
      inject: [PG_POOL],
      useFactory: (pool: Pool) => {
        return drizzle(pool, { schema: appSchema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule implements OnApplicationShutdown {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async onApplicationShutdown() {
    await this.pool.end();
    console.log('Database pool successfully drained.');
  }
}
