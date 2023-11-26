import { ProductModel } from "../../data";
import { CreateProductDto } from "../../domain/dtos/product/product-dto";
import { CustomError } from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/pagination-dtos";
export class ProductService {

  constructor() {

  }
  async createProduct(createProcuctDto: CreateProductDto) {
    const productExist = await ProductModel.findOne({ name: createProcuctDto.name })
    if (productExist) throw CustomError.badRequest('Producto ya existe')
    try {
      const product = new ProductModel({
        ...createProcuctDto
      })
      await product.save()
      return {
        msg: 'Producto creado',
        product
      }
    } catch (error) {
      throw CustomError.badRequest(`${error}`)
    }



  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user').populate('category')
      ]);

      return {
        total,
        page: page,
        limit: limit,
        next: `/api/ptoducts?page=${page + 1} &limit=${limit}`,
        previous: (page - 1 > 0) ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products,
      };
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }

  async getProductById() {

  }



  async updateProduct() {

  }

  async deleteProduct() {

  }

}

