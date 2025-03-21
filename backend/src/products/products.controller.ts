import { CreateProductDto } from './dto/create-product-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product-dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit = 10,
    @Query('cursor') cursor?: string,
  ) {
    return this.productsService.findAll(search, limit, cursor);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Roles(['admin'])
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Roles(['admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }

  @Roles(['admin'])
  @Put(':id')
  replace(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productsService.replace(id, body);
  }

  @Roles(['admin'])
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
