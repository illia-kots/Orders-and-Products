import { ProductType } from '../types/Product';
import { fetchClient } from '../utils/fetchClient';

export const getProducts = () => {
  return fetchClient.get<ProductType[]>('/products.json');
};
