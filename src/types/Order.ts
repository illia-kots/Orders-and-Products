import { ProductType } from './Product';

export interface OrderType {
  id: number,
  title: string,
  date: string,
  description: string,
  products: ProductType[],
}
