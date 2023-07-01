import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidate from '../middlewares/loginValidate';

const loginRouter = Router();

loginRouter.post('/login', loginValidate, loginController.loginAcess);

export default loginRouter;