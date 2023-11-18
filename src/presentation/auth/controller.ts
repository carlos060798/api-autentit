import { Response,Request } from "express";
import { RegisteruserDto } from '../../domain/dtos/auth/register-user-dto';
import { AuthService } from '../../presentation/services/auth.service';
import { CustomError } from '../../domain';


export  class  AuthController{
    constructor(
        public readonly authService:AuthService
    ) {}

   private handleError(error:unknown,res:Response){
     if(error instanceof CustomError){
         res.status(error.statusCode).json({error:error.message})     
        }
      console.log(`${error}`)
      return res.status(500).json({error:"Error interno"})

   }


   registerUser=(req:Request,res:Response)=>{
     const [error,registerDto]=  RegisteruserDto.create(req.body)
     if(error) return res.status(400).json(error)
     

        this.authService.registerUser(registerDto!).then((user)=>{
            res.status(200).json(user)
        }).catch((error)=>{
            this.handleError(error,res)
        }
        )
   }
    loginUser= (req:Request,res:Response)=>{
        res.send('login')
    }
    validateEmail=(req:Request,res:Response)=>{
        res.send('validate')
    }

}