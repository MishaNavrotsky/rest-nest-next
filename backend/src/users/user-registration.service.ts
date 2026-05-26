import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { DRIZZLE } from '../db/db.constants';
import * as dbModule from 'src/db/db.module';
import {
  users,
  userPrivates,
  CreateUserPayload,
  CreateUserPrivatePayload,
} from 'src/users/users.schema';
import { postgresErrorResolver } from 'src/common/utils/database-error.util';

@Injectable()
export class UserRegistrationService {
  constructor(@Inject(DRIZZLE) private readonly db: dbModule.AppDatabase) {}

  async register(
    publicData: CreateUserPayload,
    privateData: CreateUserPrivatePayload,
  ) {
    return await this.db.transaction(async (tx) => {
      try {
        const [newUser] = await tx.insert(users).values(publicData).returning();

        await tx.insert(userPrivates).values({
          userId: newUser.id,
          ...privateData,
        });

        return newUser;
      } catch (error) {
        const err = postgresErrorResolver(error);
        throw new BadRequestException(
          `Database execution failed ${err.message}`,
        );
      }
    });
  }
}
