import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddlewere } from '../middleware/auth-middleware';
import { ProductService } from '../services/product-services';
export class ProductRoutes {


    static  get routes() : Router {
        const router = Router();
        const  productService= new ProductService();
        const  controller= new ProductController(productService);
        
        router.get('/',controller.getProducts)
        router.post('/',[AuthMiddlewere.validateJwtToken],controller.createProduct)
 
        return router;
    }
  


}