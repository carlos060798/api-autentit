import { Request, Response } from "express";
import { CustomError,  } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/category-dto';
import { CategoryService } from '../../presentation/services/category.service';




export class CategoryController {
    constructor(
        private readonly  categoryService:CategoryService

    ) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
            return;
        }
        console.log(`${error}`)
       
        res.status(500).json({ msg: "Error interno"})
    
    } 

    createCategory = (req: Request, res: Response) => {
     console.log("soy body :",req.body)
    const [error,createCategoryDto]= CreateCategoryDto.create(req.body)
    if(error) return res.status(401).json(error)
    console.log("soy body :",req.body.user)
    this.categoryService.createCategory(createCategoryDto!,req.body.user)
        .then((category) => res.status(201).json(category))
        .catch((error) => this.handleError(error, res))

    }

    getCategories = (req: Request, res: Response) => {
        res.json("get categories")
    }

    getCategory = (req: Request, res: Response) => {
        res.json("get category")
    }

    updateCategory = (req: Request, res: Response) => {
        res.json("update category")
    }

    deleteCategory = (req: Request, res: Response) => {
        res.json("delete category")
    }

}