import { CreateCategoryDto } from "../../domain/dtos/category/category-dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CategoryModel } from "../../data/mongo/models/category-model";
import { CustomError } from "../../domain";
export class CategoryService {
  constructor() { }
  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    console.log("soy user  id:", user.id);

    const categoryexist = await CategoryModel.create({ name: createCategoryDto.name });
    if (!categoryexist) throw CustomError.badRequest(" Categoria ya existe ");
    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        userid: user.id,
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
}
