import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  public async list() {
    try {
      const result = await this.productService.getAll();
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  @Post()
  public async create(
    @Body(new ValidationPipe()) createProduct: CreateProductDto,
  ) {
    console.log(
      '🔰 > file: products.controller.ts > line 28 > ProductsController > createProduct',
      createProduct,
    );
    try {
      const result = await this.productService.create(createProduct);
      return result;
    } catch (error) {
      return error;
    }
  }
}
