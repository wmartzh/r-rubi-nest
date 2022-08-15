import { UserTypes } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/dtos/user.dto';
import { UserForm, UserService } from 'src/user/user.service';
import { jwtConstants } from './jwt.constants';
import { Request as ExpressRequest } from 'express';
import { object } from 'joi';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly signOpts = {
    privateKey: process.env.APP_KEY,
    expiresIn: process.env.APP_TOKEN_EXP,
  };
  public async validateUser(email: string, pass: string) {
    const user = await this.userService.getByEmail(email);

    const isValidPassword = await this.userService.validatePassword(
      user.password,
      pass,
    );
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = {
      userId: user.id,
      email: user.email,
      type: 'access',
    };
    const accessToken = this.jwtService.sign(payload, this.signOpts);

    return {
      accessToken,
    };
  }

  public async registerUser(user: CreateUserDto) {
    const newUser: UserForm = {
      name: user.name,
      email: user.email,
      userType: UserTypes.UNDEFINED,
      password: await this.userService.hashPassword(user.password),
    };
    return this.userService.create(newUser);
  }

  public async verifyToken(request: ExpressRequest) {
    console.log(
      ' > file: auth.service.ts > line 57 > AuthService > verifyToken > request',
      Object.keys(request),
    );
    // const isValid = await this.jwtService.verifyAsync(body.token, {
    //   secret: jwtConstants.secret,
    // });
    // if (!isValid) {
    //   throw new UnauthorizedException();
    // }
    return {
      message: 'ok',
      user: request.user,
    };
  }
}
