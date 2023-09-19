import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';
import { ProductType } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: ProductType,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    guarantee,
    price,
    order,
  } = product;

  const { orderList } = useAppSelector((state) => state.orders);

  const formatDate = (date: string) => {
    const fullDate = new Date(date);
    const day = fullDate.getDate().toString().padStart(2, '0');
    const year = fullDate.getFullYear();
    const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');

    return `${day} / ${month} / ${year}`;
  };

  const getFullDate = useMemo(() => {
    return `с ${formatDate(guarantee.start)}`;
  }, [guarantee.start]);

  const getFullEndDate = useMemo(() => {
    return `по ${formatDate(guarantee.end)}`;
  }, [guarantee.end]);

  const prices = price.map(priceItem => `${priceItem.value} ${priceItem.symbol}`);

  const getOrderName = useMemo(() => {
    const foundOrder = orderList.find((item) => item.id === order);

    return foundOrder?.title;
  }, [orderList, order]);

  return (
    <div className="product-card">
      <span className="product-card__circuit" />

      <h6 className="
        product-card__title
        m-0
        mx-3
        text-truncate"
      >
        {product.title}
      </h6>

      <h6 className="
        product-card__type
        m-0
        mr-2"
      >
        {product.type}
      </h6>

      <div className="
        product-card__date
        text-muted
        m-0
        mx-5"
      >
        <p className="product-card__date--time m-0">
          {getFullDate}
        </p>

        <p className="product-card__date--fulldate m-0">
          {getFullEndDate}
        </p>
      </div>

      <div className="product-card__price text-muted">
        <p className="product-card__price--currency m-0">
          {prices[0]}
        </p>

        <p className="product-card__price--default m-0">
          {prices[1]}
        </p>
      </div>

      <p className="
        product-card__order-name
        text-muted
        text-truncate
        m-0"
      >
        {getOrderName}
      </p>
    </div>
  );
};
