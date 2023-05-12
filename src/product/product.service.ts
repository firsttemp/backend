import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { In, Repository } from "typeorm";
import { ProductCreateDto } from "./dto/product-create.dto";
import { Category } from "../categories/category.entity";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { FileService } from "../file/file.service";
import { ProductImage } from "./entities/product-image.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>,
    private fileService: FileService
  ) {}


  findAll() {
    return this.productRepository.find({
      relations: ['images'],
    });
  }

  findOne(id: number) {
    return this.getProductById(id)
  }

  async create(images: Express.Multer.File[], productDto: ProductCreateDto): Promise<any> {

    const categories: Category[] = await this.getCategories(productDto.categoryIDs)
    if (!categories || categories.length < 1) {
      throw new UnprocessableEntityException('Categories not found')
    }

    const urls: string[] = await this.fileService.saveImages(images)
    if (!urls) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const newProduct = {
      ...productDto,
      category: [...categories]
    }
    const savedProduct: Product = await this.productRepository.save(newProduct);


    for (const url of urls) {
      const newProductImage = new ProductImage();
      newProductImage.url = url;
      newProductImage.product = savedProduct;

      await this.productImageRepository.save(newProductImage);
    }
    return { message: 'New Product added' }
  }

  async update(productUpdateDto: ProductUpdateDto, id: number) {
    const categories: Category[] = await this.getCategories(productUpdateDto.categoryIDs);
    const {categoryIDs, ...rest} = productUpdateDto;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })

    const product = await queryBuilder.getOne();

    return this.productRepository.save({...product, ...rest, category: categories} )

  }

  private getCategories(categoryIdArray: number[]): Promise<Category[]> {
    return this.categoryRepository.findBy({id: In([...categoryIdArray])})
  }

  private getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({where: {id}});
  }
}
