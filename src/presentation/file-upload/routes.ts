import { Router } from "express";
import { FileService } from "../../presentation/services/file-service";
import { FileController } from "../../presentation/file-upload/controller";

export class FileRoutes {
    
    static  get routes() : Router {
        const router = Router();
        const fileServe= new FileService();
        const controller = new FileController(fileServe);
    
        // carga de archivo 
        router.post('/single/:type',controller.FileUpload);

       // carga de archivos multiples
        router.post('/multiple/:type',controller.FileUploadMultiple);
         
 
        return router;
    }



}