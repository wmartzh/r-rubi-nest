import { Prisma, User, UserTypes } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';
import * as bcrypt from 'bcrypt';
export class UserForm {
  name: string;
  email: string;
  password: string;
  userType: UserTypes;
}

@Injectable()
export class UserService {
  private userModel: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(private readonly databaseService: DatabaseService) {
    this.userModel = this.databaseService.prismaClient.user;
  }
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }

  public async create(user: UserForm) {
    return this.userModel.create({
      data: user,
    });
  }

  public async update(id: string, user: UserForm): Promise<User> {
    return this.userModel.update({
      where: {
        id: id,
      },
      data: user,
    });
  }
  public async getByEmail(email: string): Promise<User> {
    return this.userModel.findFirst({
      where: {
        email: email,
      },
    });
  }
  public async getById(id: string): Promise<User> {
    return this.userModel.findFirst({
      where: {
        id: id,
      },
    });
  }
  public async getAll(): Promise<User[]> {
    return this.userModel.findMany();
  }
}
