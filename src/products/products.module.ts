import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [CommonModule],
})
export class ProductsModule {}
