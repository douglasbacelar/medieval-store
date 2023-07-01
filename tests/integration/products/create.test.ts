import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productsMock from '../../mocks/products.mock.test';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Recebeu todas as informações corretamente e criou um produto novo', async function () {
    const httpBodyResquest = productsMock.validProduct;

    const mockCreate = ProductModel.build(productsMock.createProductReturned);
    sinon.stub(ProductModel, 'create').resolves(mockCreate);
  
    const httpResponse = await chai.request(app).post('/products').send(httpBodyResquest);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productsMock.createProductReturned);
  })
});