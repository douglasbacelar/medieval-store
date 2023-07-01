import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/checkToken';
import Login from '../types/Login';
import userModel from '../database/models/user.model';
import { ResponseService } from '../types/ResponseService';
import { Token } from '../types/Token';

async function loginAcess(login: Login): Promise<ResponseService<Token>> {
  const host = await userModel.findOne({ where: { username: login.username } });

  if (host === null || !bcrypt.compareSync(login.password, host.dataValues.password)) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }
  const { username, id } = host.dataValues;
  const token = jwtUtil.sign({ username, id });
  return { status: 200, data: { token } };
}

export default {
  loginAcess,
};