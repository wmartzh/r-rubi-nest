import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/product.dto';
import { ProductsService } from './products.service';

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
