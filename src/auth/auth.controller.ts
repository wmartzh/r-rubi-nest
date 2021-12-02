import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
  @Post('register')
  async register(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.authService.registerUser(user);
  }
}
