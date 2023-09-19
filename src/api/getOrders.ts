import { OrderType } from '../types/Order';
import { fetchClient } from '../utils/fetchClient';

export const getOrders = () => {
  return fetchClient.get<OrderType[]>('/orders.json');
};
