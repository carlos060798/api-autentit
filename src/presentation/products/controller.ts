import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { CreateProductDto } from '../../domain/dtos/product/product-dto';
import { ProductService } from '../../presentation/services/product-services';


export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {

    }

    private hadleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }

    createProduct = async (req: Request, res: Response) => {

        const [error, createProductDto] = CreateProductDto.create({
            ...req.body,
            user: req.body.user.id
        })
        if (error) return this.hadleError(error, res)
        try {
            this.productService.createProduct(createProductDto!).then((product) => res.status(201).json(product))
                .catch((error) => this.hadleError(error, res))
        } catch (error) {
            res.status(500).json({ message: 'error' })
        }
    }

    getProducts = async (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query
        try {
            this.productService.getProducts({ page: +page, limit: +limit }).then((products) => res.status(200).json(products))
                .catch((error) => this.hadleError(error, res))
        } catch (error) {
            res.status(500).json({ message: 'error' })
        }
    }

}