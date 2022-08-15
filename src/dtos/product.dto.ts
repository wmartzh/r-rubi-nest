import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description?: string;
  @IsString()
  @IsEmpty()
  productImage?: string;
  @IsNumber()
  cost: string;
  @IsNumber()
  price: string;
  @IsNumber()
  stock?: string;
}
