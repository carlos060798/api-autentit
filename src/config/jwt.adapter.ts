import  jwt from 'jsonwebtoken'
import { envs } from './envs'

const JwtKey = envs.JWT_SECRET

export class jwtAdapter{
  
  static generateToken(payload: any,duration:string="2h"){
    return new Promise((resolve)=>{
      jwt.sign(payload,JwtKey,{expiresIn:duration},(err,token)=>{
        if(err)  return resolve(null)
        resolve (token)
        
      })
    })


  }
 
    static validationToken(token: string): any{
        throw new Error('Method not implemented.');
    }



}