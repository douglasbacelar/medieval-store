import { Request, Response } from 'express';
import loginService from '../services/login.service';

async function loginAcess(req: Request, res: Response) {
  const { username, password } = req.body;
  const response = await loginService.loginAcess({ username, password });
  console.log(response);

  return res.status(response.status).json(response.data);
}

export default {
  loginAcess,
};