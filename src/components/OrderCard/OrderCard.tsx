import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import monthsNames from '../../types/MonthsNames';
import { OrderType } from '../../types/Order';
import { ProductType } from '../../types/Product';

import './OrderCard.scss';

type Props = {
  order: OrderType,
  onSelectOrder: (orderId: number | null) => ProductType[];
  isSelectedOrder: boolean,
  onSelectOrderToRemove: (orderItem: OrderType | null) => void,
  handleIsPopupOpened: (state: boolean) => void,
  handleSetIsOrderRemove: (state: boolean) => void,
};

export const OrderCard: React.FC<Props> = ({
  order,
  onSelectOrder,
  isSelectedOrder,
  onSelectOrderToRemove,
  handleIsPopupOpened,
  handleSetIsOrderRemove,
}) => {
  const {
    title,
    id,
    date,
  } = order;

  const { items } = useAppSelector((state) => state.products);
  const [defaultTotalPrice, setDefaultTotalPrice] = useState(0);
  const [defaultCurrentSymbol, setDefaultCurrentSymbol] = useState('');
  const [currencyTotalPrice, setCurrencyTotalPrice] = useState(0);
  const [currencyCurrentSymbol, setCurrencyCurrentSymbol] = useState('');

  const getProductsInOrder = (orderId: number) => {
    const productsInOrder = items
      .filter((product) => product.order === orderId);

    return productsInOrder.length;
  };

  const getTime = useMemo(() => {
    const dateTime = new Date(date);
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    return `${minutes} / ${hours}`;
  }, [date]);

  const getFullDate = useMemo(() => {
    const fullDate = new Date(date);
    const day = fullDate.getDate().toString().padStart(2, '0');
    const year = fullDate.getFullYear();
    const monthIndex = fullDate.getMonth();
    const month = monthsNames[monthIndex];

    return `${day} / ${month} / ${year}`;
  }, [date]);

  const handleSelectOrder = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSelectOrder(id);
    }
  };

  const handleRemoveOrder = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSelectOrderToRemove(order);
      handleIsPopupOpened(true);
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      const productsInOrder = items
        .filter((product) => product.order === order.id);

      let fullPrice = 0;
      let symbol = '';
      let currencyFullPrice = 0;
      let currencySymbol = '';

      productsInOrder.forEach((product) => {
        product.price.forEach((price) => {
          if (price.isDefault === 1) {
            fullPrice += price.value;
            symbol = price.symbol;
          }

          if (price.isDefault === 0) {
            currencyFullPrice += price.value;
            currencySymbol = price.symbol;
          }
        });
      });

      return {
        fullPrice,
        defaultCurrentSymbol: symbol,
        currencyFullPrice,
        currencyCurrentSymbol: currencySymbol,
      };
    };

    const result = calculateTotal();

    setDefaultTotalPrice(result.fullPrice);
    setDefaultCurrentSymbol(result.defaultCurrentSymbol);
    setCurrencyTotalPrice(result.currencyFullPrice);
    setCurrencyCurrentSymbol(result.currencyCurrentSymbol);
  }, [items, order.id]);

  return (
    <div className="order-card text-muted">
      <span className={classNames(
        'order-card__title text-truncate',
        { 'order-card__title--hidden': isSelectedOrder },
      )}
      >
        {title}
      </span>

      <div
        className="order-card__burger"
        onClick={() => onSelectOrder(id)}
        onKeyDown={handleSelectOrder}
        aria-label="OrderInfo"
        role="button"
        tabIndex={0}
      >
        <div className="fa-solid fa-list fa-sm" />
      </div>

      <div className="order-card__products mx-3">
        <p className="
          text-lg
          text-bold
          my-0"
        >
          {getProductsInOrder(id)}
        </p>

        <p className="text-sm my-0">
          Продукта
        </p>
      </div>

      <div className="
        order-card__date
        m-0
        mx-5"
      >
        <p className="order-card__date--time m-0">
          {getTime}
        </p>

        <p className="order-card__date--fulldate m-0">
          {getFullDate}
        </p>
      </div>

      <div className={classNames(
        'order-card__price',
        { 'order-card__price--hidden': isSelectedOrder },
      )}
      >
        <p className="order-card__price--currency m-0">
          {`${currencyTotalPrice} ${currencyCurrentSymbol}`}
        </p>

        <p className="order-card__price--default m-0">
          {`${defaultTotalPrice} ${defaultCurrentSymbol}`}
        </p>
      </div>

      <div className={classNames(
        'order-card__trash',
        { 'order-card__trash--hidden': isSelectedOrder },
      )}
      >
        <div
          className="
            fa-solid
            fa-trash
            fa-sm"
          onClick={() => {
            handleSetIsOrderRemove(true);
            handleIsPopupOpened(true);
            onSelectOrderToRemove(order);
          }}
          onKeyDown={handleRemoveOrder}
          aria-label="Remove"
          role="button"
          tabIndex={0}
        />
      </div>
    </div>
  );
};
