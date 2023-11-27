import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { Uuid } from "../../config/uuid.adapter";

export class FileService {
  constructor(
    private readonly  uuid= Uuid.V4
  ) {}

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
    
    const fileExtension = file.mimetype.split("/").at(1) ?? ""; // remove extension
   
    if (!validRxtensions.includes(fileExtension)) {
      throw new Error("Invalid file extension");
    }
   
   
   
    const destination= path.resolve(__dirname,`../../../`,folder);
    this.checkFolder(destination);
    const fileName = `${this.uuid()}.${fileExtension}`;
    file.mv(`${destination}/${fileName}`);


    return {fileName}

    }catch(err){
      console.log(err);
      throw err;
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
