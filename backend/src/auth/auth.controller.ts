import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: CreateUserDto,
    @Req() req: express.Request,
  ): Promise<UserDto> {
    const user = await this.authService.registerUser(registerDto, req.ip);
    return plainToInstance(UserDto, user);
  }
}
