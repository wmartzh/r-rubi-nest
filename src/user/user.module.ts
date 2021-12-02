import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserService } from './user.service';

@Module({
  imports: [CommonModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
