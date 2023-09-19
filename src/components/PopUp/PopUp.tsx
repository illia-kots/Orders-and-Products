import { useMemo } from 'react';

import { useAppSelector } from '../../app/hooks';
import { OrderType } from '../../types/Order';
import './PopUp.scss';

type Props = {
  orderToRemove: OrderType | null,
  handleRemove: React.Dispatch<React.SetStateAction<boolean>>,
  handleIsPopupOpened: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PopUp: React.FC<Props> = ({
  orderToRemove,
  handleRemove,
  handleIsPopupOpened,
}) => {
  const { orderList } = useAppSelector((state) => state.orders);
  const { items } = useAppSelector((state) => state.products);

  const getProductsCount = (orderId?: number) => {
    if (!orderId) {
      return 0;
    }

    const productsInOrder = items
      .filter((product) => product.order === orderId);

    return productsInOrder.length;
  };

  const getOrder = useMemo(() => {
    const foundOrder = orderList
      .find((order) => order.id === orderToRemove?.id);

    return foundOrder;
  }, [orderToRemove, orderList]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleIsPopupOpened(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup__item">
        <p className="popup__item-info text-bold">
          Вы уверены, что хотите удалить этот приход?
        </p>

        <p className="
          popup__item-title
          text-truncate
          m-0"
        >
          {getOrder?.title}
        </p>

        <p className="
          popup__item-products
          text-muted
          m-0"
        >
          Продукты /
          {' '}
          {getProductsCount(orderToRemove?.id)}
        </p>

        <div
          className="popup__cross"
          onClick={() => handleIsPopupOpened(false)}
          onKeyDown={handleKeyDown}
          aria-label="Close"
          role="button"
          tabIndex={0}
        >
          <span className="
            popup__cross-icon
            fa-solid
            fa-xmark
            fa-sm"
          />
        </div>

        <div className="popup__item-block block">
          <div className="block__buttons">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => handleIsPopupOpened(false)}
            >
              Отменить
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleRemove(false);
                handleIsPopupOpened(false);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div className="popup__background" />
    </div>
  );
};
