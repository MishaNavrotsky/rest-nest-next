import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../db/db.constants';
import * as dbModule from 'src/db/db.module';
import { CACHE_CLIENT } from 'src/cache/cache.constants';
import Redis from 'ioredis';
import { User, users } from './users.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private readonly db: dbModule.AppDatabase,
    @Inject(CACHE_CLIENT) private readonly cache: Redis,
  ) {}

  async getById(id: User['id']) {
    return await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
}
