import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddlewere } from "../middleware/auth-middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
    
    static  get routes() : Router {
        const router = Router();
        const categoryService = new CategoryService();
        const controller = new CategoryController(categoryService);
        
        router.get('/', controller.getCategories)
        router.post('/',[AuthMiddlewere.validateJwtToken],controller.createCategory)
 
        return router;
    }



}
