import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function listOrders(req: Request, res: Response) {
  const response = await orderService.listOrders();

  return res.status(200).json(response.data);
}

export default {
  listOrders,
};