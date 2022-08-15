import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/common/database.service';
import { CreateProductDto } from 'src/dtos/product.dto';

@Injectable()
export class ProductsService {
  private client: PrismaClient;
  constructor(private database: DatabaseService) {
    this.client = this.database.prismaClient;
  }
  public async getAll() {
    return this.client.product.findMany();
  }
  public async create(data: CreateProductDto) {
    const newProduct = await this.client.product.create({
      data: {
        name: data.name,
        description: data.description,
        productImage: data.productImage,
        cost: Number(data.cost),
        stock: Number(data.stock),
        price: Number(data.price),
      },
    });

    if (!newProduct) {
      throw new HttpException('Could not save the Product', 500);
    }
    return {
      message: 'Product was created successfully',
    };
  }
  public async getById(id: string) {}
  public async update() {}
  public async delete() {}
}
