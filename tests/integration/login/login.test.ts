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
});