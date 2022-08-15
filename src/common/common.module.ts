import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaClient } from '.prisma/client';
@Module({
  providers: [DatabaseService, PrismaClient],
  exports: [DatabaseService, PrismaClient],
})
export class CommonModule {}
