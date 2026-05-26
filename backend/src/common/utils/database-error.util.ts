import { InternalServerErrorException } from '@nestjs/common';
import { DatabaseError } from 'pg';

export function postgresErrorResolver(error: unknown): DatabaseError {
  if (error instanceof DatabaseError) {
    return error;
  }

  if (error instanceof Error) {
    throw new InternalServerErrorException(error.message);
  }

  throw new InternalServerErrorException(
    'An unexpected system error occurred.',
  );
}
