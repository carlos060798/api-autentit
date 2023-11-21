
import {envs} from '../../config/envs'
import {Router} from 'express'
import { AuthController } from './controller';
import  {AuthService} from '../../presentation/services/auth.service'
import { EmailService } from '../../presentation/services/emai-service';
export  class  AuthRoutes {

    
    static  get routes(): Router {
      const emailService= new EmailService(
        envs.MAILER_SERVICE,
        envs.MAILER_EMAIL,
        envs.MAILER_SECRET_KEY,
        envs.SEND_EMAIL
      )
      const  authService= new AuthService(emailService)
        const controller= new AuthController(authService)
      const  router= Router()
        router.post('/login',controller.loginUser)
        router.post('/register',controller.registerUser)
        router.get('/validate-email/:token',controller.validateEmail)
        return router
    }

}