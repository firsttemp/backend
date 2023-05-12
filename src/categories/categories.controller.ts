import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriesService } from './categories.service';
import { CategoryCreateDto } from "./dto/category-create.dto";
import { CategoryUpdateDto } from "./dto/category-update.dto";

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.categoryService.findByName(name);
  }

  @Post()
  async create(@Body() dto: CategoryCreateDto) {
    return this.categoryService.create(dto);
  }

  @Put(':name')
  async update(@Body() dto: CategoryUpdateDto, @Param('name') name: string) {
    return this.categoryService.update(dto, name);
  }

  @Delete('name')
  async delete(@Param('name') name: string) {
    return this.categoryService.delete(name);
  }
}
