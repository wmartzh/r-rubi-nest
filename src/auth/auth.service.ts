import { UserTypes } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { UserForm, UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async validateUser(name: string, email: string, pass: string) {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  public async registerUser(user: CreateUserDto) {
    const newUser: UserForm = {
      name: user.name,
      email: user.email,
      userType: UserTypes.UNDEFINED,
      password: await this.userService.hashPassword(user.password),
    };
    return await this.userService.create(newUser);
  }
}
