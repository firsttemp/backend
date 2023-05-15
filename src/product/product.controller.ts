import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { TransformToNumberArrayPipe } from "./transform.pipe";
import { Product } from "./entities/product.entity";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.productService.findOne(id);
  }


  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body(TransformToNumberArrayPipe) productDto: ProductCreateDto,
  ): Promise<Product> {
    return this.productService.create(images, productDto);
  }

  @Put(":id")
  async update(
    @Body() product: ProductUpdateDto,
    @Param("id") id: number
  ) {
    return this.productService.update(product, id);
  }
}
