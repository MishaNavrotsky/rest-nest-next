import { Injectable } from '@nestjs/common';
import { UserRegistrationService } from 'src/users/user-registration.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRegistration: UserRegistrationService) {}

  async registerUser(dto: CreateUserDto, ip?: string) {
    const passwordHash = await this.hashPassword(dto.password);

    return await this.userRegistration.register(
      { email: dto.email, name: dto.name },
      { passwordHash, lastLoginIp: ip },
    );
  }

  async validatePassword(password: string, hash: string) {
    return await compare(password, hash);
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }
}
