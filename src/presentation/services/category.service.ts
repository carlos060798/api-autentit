  import { CreateCategoryDto } from "../../domain/dtos/category/category-dto";
  import { UserEntity } from "../../domain/entities/user.entity";
  import { CategoryModel } from "../../data/mongo/models/category-model";
  import { CustomError } from "../../domain";
  import { PaginationDto } from "../../domain/dtos/shared/pagination-dtos";
  export class CategoryService {
    constructor() {}
    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
      const categoryexist = await CategoryModel.findOne({
        name: createCategoryDto.name,
      });
      if (categoryexist) throw CustomError.badRequest(" Categoria ya existe ");
      try {
        const category = new CategoryModel({
          ...createCategoryDto,
          user: user.id,
        });
        console.log(category);
        await category.save();
        return {
          id: category.id,
          name: category.name,
          available: category.available,
        };
      } catch (error) {
        console.log(error);
        throw CustomError.badRequest(`${error}`);
      }
    }

    async getCategories(paginationDto: PaginationDto) {
      const { page, limit } = paginationDto;
      try {
        const [total, categories] = await Promise.all([
          CategoryModel.countDocuments(),
          CategoryModel.find()
            .skip((page - 1) * limit)
            .limit(limit),
        ]);

        return {
          total,
          page: page,
          limit: limit,
          next: `/api/categories?page=${page+1} &limit=${limit}`,
          previous:(page-1>0) ? `/api/categories?page=${page-1}&limit=${limit}`:null,

          categories: categories.map((category) => ({
            id: category.id,
            name: category.name,
            available: category.available,
          })),
        };
      } catch (error) {
        throw CustomError.badRequest(`${error}`);
      }
    }
  }
