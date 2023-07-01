import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ResponseService } from '../types/ResponseService';

async function createProduct(product: ProductInputtableTypes): Promise<ResponseService<Product>> {
  const addProduct = await ProductModel.create(product);
  const response: ResponseService<Product> = {
    status: 201, data: addProduct.dataValues,
  };
  return response;
}

async function getAll(): Promise<ResponseService<ProductSequelizeModel[]>> {
  const allProduct = await ProductModel.findAll();

  return { status: 200, data: allProduct };
}

export default {
  createProduct,
  getAll,
};