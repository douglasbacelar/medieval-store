import { Request, Response } from 'express';
import productService from '../services/product.service';

async function createProduct(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const response = await productService.createProduct({name, price, orderId});

  return res.status(201).json(response.data);
}

async function getAll(req: Request, res: Response) {
  const response = await productService.getAll();

  return res.status(200).json(response.data);
}

export default {
  createProduct,
  getAll,
};