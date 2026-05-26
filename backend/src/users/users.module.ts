import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPrivatesService } from './users-private.service';
import { UserRegistrationService } from './user-registration.service';

@Module({
  providers: [UsersService, UserPrivatesService, UserRegistrationService],
  exports: [UsersService, UserPrivatesService, UserRegistrationService],
})
export class UsersModule {}
