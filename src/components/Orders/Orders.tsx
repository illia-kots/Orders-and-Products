import { useEffect, useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import { OrderType } from '../../types/Order';
import { ProductType } from '../../types/Product';
import { OrderCard } from '../OrderCard';

import './Orders.scss';

type Props = {
  onSelectOrder: (orderId: number | null) => ProductType[];
  isSelectedOrder: boolean,
  onSelectOrderToRemove: (orderItem: OrderType | null) => void,
  orderToRemove: OrderType | null,
  isOrderRemove: boolean,
  list: OrderType[],
  handleSetList: (items: OrderType[]) => void,
  handleIsPopupOpened: (state: boolean) => void,
  handleSetIsOrderRemove: (state: boolean) => void,
};

export const Orders: React.FC<Props> = ({
  onSelectOrder,
  isSelectedOrder,
  onSelectOrderToRemove,
  orderToRemove,
  isOrderRemove,
  list,
  handleSetList,
  handleIsPopupOpened,
  handleSetIsOrderRemove,
}) => {
  const { orderList } = useAppSelector((state) => state.orders);

  const [order, setOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const filteredList = list.filter((item) => item.id !== order?.id);

    if (orderToRemove?.id !== order?.id) {
      setOrder(orderToRemove);
    }

    handleSetList(filteredList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrderRemove]);

  useEffect(() => {
    handleSetList(orderList);
  }, [handleSetList, orderList]);

  return (
    <>
      {list.map((item) => (
        <OrderCard
          key={item.id}
          order={item}
          onSelectOrder={onSelectOrder}
          isSelectedOrder={isSelectedOrder}
          onSelectOrderToRemove={onSelectOrderToRemove}
          handleIsPopupOpened={handleIsPopupOpened}
          handleSetIsOrderRemove={handleSetIsOrderRemove}
        />
      ))}

      {!list.length && (
        <p className="
          container
          m-5
          alert
          alert-info
          text-center"
        >
          No items in list
        </p>
      )}
    </>
  );
};
