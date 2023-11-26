import { Request, Response } from "express";
import { CustomError,  } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/category-dto';
import { CategoryService } from '../../presentation/services/category.service';
import { PaginationDto } from "../../domain/dtos/shared/pagination-dtos";




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
    const [error,createCategoryDto]= CreateCategoryDto.create(req.body)
    if(error) return res.status(401).json(error)
    this.categoryService.createCategory(createCategoryDto!,req.body.user)
        .then((category) => res.status(201).json(category))
        .catch((error) => this.handleError(error, res))
     
       

    }

    getCategories = (req: Request, res: Response) => {
        const  {page=1, limit=10}= req.query 
        const [error,paginationDto]=PaginationDto.create(+page,+limit) // +page is the same as parseInt(page)
        if(error) return res.status(400).json(error)


           this.categoryService.getCategories(paginationDto!)
            .then((categories) => res.status(200).json(categories))
            .catch((error) => this.handleError(error, res))
   
        
        }

   

}