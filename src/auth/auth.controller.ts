import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('register')
  async register(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.authService.registerUser(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verify(@Request() req: ExpressRequest) {
    return { user: req.user };
  }
}
