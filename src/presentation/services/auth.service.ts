import { RegisteruserDto } from '../../domain/dtos/auth/register-user-dto';
import { UserModel } from '../../data/mongo/models/user.model';
import { CustomError } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';
export  class  AuthService {
    constructor() {}


    public   async registerUser(registeruserDto:RegisteruserDto){
        
      const existeUser= await UserModel.findOne({email:registeruserDto.email})
        if(existeUser)  throw CustomError.badRequest("El usuario ya existe",)
        
        try{
            const user= await UserModel.create(registeruserDto)
            console.log(user)
            await user.save()
            
            const userEntity= UserEntity.fromObject(user)
            return userEntity

        }catch(error){
            console.log(error)
            throw CustomError.badRequest(`${error}`)

        }

    }
}