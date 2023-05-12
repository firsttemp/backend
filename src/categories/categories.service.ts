import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryCreateDto } from "./dto/category-create.dto";
import { CategoryUpdateDto } from "./dto/category-update.dto";

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  findByName(name: string) {
    return this.categoryRepository.findOne({ where: { name } });
  }

  create(dto: CategoryCreateDto) {
    return this.categoryRepository.save(dto);
  }

  update(dto: CategoryUpdateDto, name: string) {
    return this.categoryRepository.update({ name }, dto);
  }

  delete(name: string) {
    return this.categoryRepository.delete({ name });
  }
}
