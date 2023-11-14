import { Response,Request } from "express";

export  class  AuthController{
    constructor() {}
   registerUser(req:Request,res:Response){
         res.send('register')
   }
    loginUser(req:Request,res:Response){
        res.send('login')
    } 
    validateEmail(req:Request,res:Response){
        res.send('validate-email')
    }

}