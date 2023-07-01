const hashedPassword = '$2a$10$28iL9VLnRDpdgOPsn.7ykejJ43oZFpX.wXH4pnaCACvgME8dwLSKK';

const validPassword = 'terrível';
const noUsernameLoginBody = { username: '', password: validPassword };
const validUsername = 'Hagar';
const noPasswordLoginBody = { username: validUsername, password: '' };
const notExistingUserBody = { username: 'teste@email.com', password: validPassword };
const validLoginBody = { username: validUsername, password: validPassword };

const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrong_password' };

const existingUser = { 
  id: 1, 
  username: validUsername,
  password: hashedPassword,
  name: 'user1',
  vocation: 'Guerreiro',
  level: 10
};

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody,
  hashedPassword
};