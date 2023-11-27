import { Request, Response } from "express";
import { CustomError, } from '../../domain';
import { FileService } from "../services/file-service";
import { UploadedFile } from "express-fileupload";
import fileUpload from 'express-fileupload';



/**
 * Controller class for handling file upload and download operations.
 */
export class FileController {
    constructor(
        private readonly fileService: FileService
    ) { }

    /**
     * Handles any errors that occur during file upload or download operations.
     * @param error - The error object.
     * @param res - The response object.
     */
    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
            return;
        }
        console.log(`${error}`)

        res.status(500).json({ msg: "Error interno" })
    }

    /**
     * Handles file upload operation.
     * @param req - The request object.
     * @param res - The response object.
     */
 
    FileUpload = (req: Request, res: Response) => {
        const files = req.files;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded." });
        }
        const file = req.files.file as UploadedFile;
        this.fileService.uploadFile(file).then((upload) => {
            res.status(200).json({ msg: "File uploaded", upload })
        }).catch((error) => {
            this.handleError(error, res);
        })
    }

    /**
     * Handles multiple file upload operation.
     * @param req - The request object.
     * @param res - The response object.
     */
    FileUploadMultiple = (req: Request, res: Response) => {
        res.status(200).json({ msg: "File downloadedss" })
    }
}