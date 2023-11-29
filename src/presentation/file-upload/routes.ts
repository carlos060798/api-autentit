import { Router } from "express";
import { FileService } from "../../presentation/services/file-service";
import { FileController } from "../../presentation/file-upload/controller";
import { FileUploadMiddleware } from "../../presentation/middleware/file-middleware";
import { TypeMiddleware } from "../../presentation/middleware/file-type-middleware";

export class FileRoutes {
    
    static  get routes() : Router {
        const router = Router();
        const fileServe= new FileService();
        const controller = new FileController(fileServe);

        // middleware para validar la carga de archivos
        router.use(FileUploadMiddleware.validateFileUpload);
    
        // carga de archivo 
        router.post('/single/:type',controller.FileUpload);

       // carga de archivos multiples
        router.post('/multiple/:type',[TypeMiddleware.validateType(['users','products','categories'])],controller.FileUploadMultiple);
         
        // mostrar imagen
        return router;
    }



}
