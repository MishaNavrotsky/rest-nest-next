import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../db/db.constants';
import * as dbModule from 'src/db/db.module';
import { CACHE_CLIENT } from 'src/cache/cache.constants';
import Redis from 'ioredis';
import { eq } from 'drizzle-orm';
import { User, users, userPrivates } from './users.schema';

@Injectable()
export class UserPrivatesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: dbModule.AppDatabase,
    @Inject(CACHE_CLIENT) private readonly cache: Redis,
  ) {}

  async getById(id: User['id']) {
    return await this.db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        privateData: true,
      },
    });
  }

  async getPrivateDataById(id: User['id']) {
    return await this.db.query.userPrivates.findFirst({
      where: eq(userPrivates.userId, id),
    });
  }
}
