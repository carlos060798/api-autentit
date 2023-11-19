import { RegisteruserDto } from '../../domain/dtos/auth/register-user-dto';
import { UserModel } from '../../data/mongo/models/user.model';
import { CustomError } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';
import { LoginuserDto } from '../../domain/dtos/auth/login-user-dto';
import { jwtAdapter } from '../../config/jwt.adapter';


import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { EmailService } from './emai-service';
import { envs } from '../../config/envs';
export  class  AuthService {
    constructor(
      private readonly emailService:EmailService,
    ) {}


    public   async registerUser(registeruserDto:RegisteruserDto){
        
      const existeUser= await UserModel.findOne({email:registeruserDto.email})
        if(existeUser)  throw CustomError.badRequest("El usuario ya existe",)
        
        try{
            const user= await UserModel.create(registeruserDto)
            user.password= bcryptAdapter.hash(registeruserDto.password)


            await user.save()
            await this.validateEmail(user.email)

            
            const {password,... userEntity}= UserEntity.fromObject(user)

            const token= await jwtAdapter.generateToken({id:user.id,email:user.email})
            if (!token) throw CustomError.internalServerError("Error al generar el token")
   
   
            return {
               user : userEntity,
               token: token
            }

        }catch(error){
            console.log(error)
            throw CustomError.badRequest(`${error}`)

        }

    }

    public async loginUser(loginuserDto:LoginuserDto){
       const user= await UserModel.findOne({email:loginuserDto.email})
         if(!user) throw CustomError.badRequest("El usuario no existe")
    
        const passwordValid= bcryptAdapter.compare(loginuserDto.password,user.password)
        if(!passwordValid) throw CustomError.badRequest("La contraseña es incorrecta")

         const {password,... userEntity}= UserEntity.fromObject(user)
         const token= await jwtAdapter.generateToken({id:user.id,email:user.email})
         if (!token) throw CustomError.internalServerError("Error al generar el token")


         return {
            user : userEntity,
            token: token
         }
        }


    private  validateEmail= async(email:string)=>{

      const token= await jwtAdapter.generateToken({email:email})
      if (!token) throw CustomError.internalServerError("Error al generar el token")

      const link=`${envs.MAILER_HOST}/auth/validate-email/${token}`
      const   html = ` 
      <h1>Valida tu cuenta</h1>
      <p>Para validar tu cuenta has click en el siguiente link</p>
      <a href="${link}">Validar cuenta : ${email}</a>
      
      `

      const mailOptions = {
        to: email,
        subject: 'Validar cuenta',
        htmlBody: html
      };
     const issend= await this.emailService.sendEmail(mailOptions) 
      if(!issend) throw CustomError.internalServerError("Error al enviar el correo")

      return true

    }

    public async validateEmailToken(token:string){
      const payload= await jwtAdapter.validationToken(token)
      if(!payload) throw CustomError.unauthorized("El token no es valido") 
      
      const {email}= payload as {email:string};
      if(!email) throw CustomError.internalServerError("Email no encontrado en el token")

       const user= await UserModel.findOne({email:email})
        if(!user) throw CustomError.badRequest("El usuario no existe")

        user.emailValided=true
        await user.save()
        return true

    }
}