import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
export  class ImageController {
   cosntructor() {}


   getImage( req: Request, res: Response, ) {

    const { type="", img="" } = req.params;

    const pathImg = path.resolve(__dirname,`../../../uploads/${type}/${img}`);

    // si la imagen el path no existe

    if(!fs.existsSync(pathImg)) {
    res.status(400).send('No existe la imagen');
    } 

    res.sendFile(pathImg);  


   }


}