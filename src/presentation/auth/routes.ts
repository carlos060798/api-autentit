
import {Router} from 'express'
import { AuthController } from './controller';
import  {AuthService} from '../../presentation/services/auth.service'
export  class  AuthRoutes {

    
    static  get routes(): Router {
      const  authService= new AuthService()
        const controller= new AuthController(authService)
      const  router= Router()
        router.post('/login',controller.loginUser)
        router.post('/register',controller.registerUser)
        router.get('/validate-email/:token',controller.validateEmail)
        return router
    }

}