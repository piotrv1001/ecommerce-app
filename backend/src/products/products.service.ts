import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { Pagination } from 'src/types/pagination';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(
    search?: string,
    limit = 10,
    cursor?: string,
  ): Promise<Pagination<Product[]>> {
    const filter: any = {};

    if (search) {
      filter.$or = [
        { $text: { $search: search } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    if (cursor) {
      filter._id = { $gt: cursor };
    }

    const products = await this.productModel
      .find(filter)
      .sort({ _id: 1 })
      .limit(limit)
      .exec();

    return {
      data: products,
      nextCursor: products.length
        ? products[products.length - 1]._id.toString()
        : undefined,
    };
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async replace(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const replacedProduct = await this.productModel
      .findOneAndReplace({ _id: id }, createProductDto, {
        new: true,
      })
      .exec();
    if (!replacedProduct) {
      throw new NotFoundException('Product not found');
    }
    return replacedProduct;
  }

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
    return deletedProduct;
  }
}
