import { Request, Response } from "express";
import { CustomError,  } from '../../domain';




export class CategoryController {
    constructor(

    ) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return res.status(500).json({ error: "Error interno" })
    
    } 

    createCategory = (req: Request, res: Response) => {

      res.json("create category")
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