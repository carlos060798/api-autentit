import {
    NextFunction,
    Request,
    Response
} from "express";

/**
 * Middleware for validating file uploads.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 */
export class FileUploadMiddleware {
    static validateFileUpload(req: Request, res: Response, next: NextFunction) {
        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ msg: "No files were uploaded." });

        if(!Array.isArray( req.files.file)){
        req.body.files= [req.files.file];

        }else{
            req.body.files= req.files.file;
        }
       
        next();
    }
}