import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ResponseService } from '../types/ResponseService';

async function listOrders(): Promise<ResponseService<OrderSequelizeModel[]>> {
  const allOrders = await OrderModel.findAll({ 
    include: [
      { model: ProductModel, as: 'product', attributes: [] },
    ],
    attributes: ['id',
      'userId',
      [
        literal('JSON_ARRAYAGG(product.id)'),
        'productIds',
      ],
    ],
    group: ['Order.id'],
  });
  console.log(allOrders);
  return { status: 200, data: allOrders };
}

export default {
  listOrders,
};
