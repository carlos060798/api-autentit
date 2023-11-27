import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";

export class FileService {
  constructor() {}

  private checkFolder(folderPath: string) { 
 
  if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath);


  }}

  async uploadFile(
    file: UploadedFile,
    folder: string = "uploads",
    validRxtensions: string[] = ["png", "jpg", "gif", "jpeg"]
  ) {
    try{
    
    const fileExtension = file.mimetype.split("/").at(1); // remove extension
    const destination= path.resolve(__dirname,`../../../`,folder);
    this.checkFolder(destination);
    file.mv(destination + `/img-1.${fileExtension}`);


    }catch(err){
      console.log(err);
    }






  }

  async  uploadFiles(
    file: UploadedFile[],
    fileName: string = "uploads",
    validRxtensions: string[] = ["png", "jpg", "gif", "jpeg"]
  ) {
    throw new Error("Not implemented yet");
  }
}
