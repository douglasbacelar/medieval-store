import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/login.mock.test';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Recebeu todas as informações corretamente e realizou o login', async function () {
    const httpBodyResquest = userMock.validLoginBody;

    const mockLogin = UserModel.build(userMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockLogin);
  
    const httpResponse = await chai.request(app).post('/login').send(httpBodyResquest);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  })

  it('Não recebeu um username, retornou um erro e status 400', async function () {
    const httpBodyResquest = userMock.noUsernameLoginBody;

    const httpResponse = await chai.request(app).post('/login').send(httpBodyResquest);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
});

it('Não recebeu uma senha, retornou um erro e status 400', async function () {
  const httpBodyResquest = userMock.noPasswordLoginBody

  const httpResponse = await chai.request(app).post('/login').send(httpBodyResquest);

  expect(httpResponse.status).to.equal(400);
  expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
});

it('Recebeu um username inexistente, retorne um erro', async function () {
  const httpBodyResquest = userMock.notExistingUserBody
  sinon.stub(UserModel, 'findOne').resolves(null);

  const httpResponse = await chai.request(app).post('/login').send(httpBodyResquest);

  expect(httpResponse.status).to.equal(401);
  expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
});

it('ao receber um e-mail existente e uma senha errada, retorne um erro', async function () {

  const httpBodyResquest = userMock.existingUserWithWrongPasswordBody 
  const mockFindOneReturn = UserModel.build(userMock.existingUser);
  sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);


  const httpResponse = await chai.request(app).post('/login')
    .send(httpBodyResquest);

  expect(httpResponse.status).to.equal(401);
  expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
});
});