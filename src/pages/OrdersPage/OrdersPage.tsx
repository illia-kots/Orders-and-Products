import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../../components/Loader';
import { OrderInfoBlock } from '../../components/OrderInfoBlock';
import { Orders } from '../../components/Orders';
import { PopUp } from '../../components/PopUp';
import { loadOrders } from '../../features/ordersSlice';
import { loadProducts } from '../../features/productsSlice';
import { ErrorType } from '../../types/Error';
import { OrderType } from '../../types/Order';
import { ProductType } from '../../types/Product';

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { items } = useAppSelector((state) => state.products);
  const {
    orderList,
    isError,
    loaded,
  } = useAppSelector((state) => state.orders);

  const [orderDetails, setOrderDetails] = useState<ProductType[]>([]);
  const [orderToRemove, setOrderToRemove] = useState<OrderType | null>(null);
  const [isSelectedOrder, setIsSelectedOrder] = useState(false);
  const [isOrderRemove, setIsOrderRemove] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [list, setList] = useState<OrderType[]>([]);

  const routeCategory = location.pathname.slice(1);

  const handleSelectOrder = (orderId: number | null) => {
    const foundOrder = orderList.find(order => order.id === orderId);

    if (foundOrder) {
      setOrderName(foundOrder.title);
    } else {
      setOrderName('');
    }

    const productsInOrder = items
      .filter((product) => product.order === orderId);

    setOrderDetails(productsInOrder);

    if (!orderToRemove) {
      setIsSelectedOrder(true);
    } else {
      setIsSelectedOrder(false);
    }

    return productsInOrder;
  };

  const handleSelectOrderToRemove = (orderItem: OrderType | null) => {
    setOrderToRemove(orderItem);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsSelectedOrder(false);
    }
  };

  useEffect(() => {
    setList(orderList);
    dispatch(loadOrders());
    dispatch(loadProducts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, routeCategory]);

  return (
    <>
      {loaded ? (
        <>
          {isError ? (
            <div
              className="
                container
                mt-5
                alert
                alert-warning
                text-center
                text-uppercase"
              style={{ width: '450px' }}
            >
              {ErrorType.GET_ORDERS}
            </div>
          ) : (
            <>
              <div className="orders__wrapper">
                <div className="orders__add">
                  <span className="
                    orders__add-icon
                    fa-solid
                    fa-plus
                    fa-xs m-0 p-0"
                  />
                </div>

                <div className="orders__count">
                  <h3 className="m-0">
                    Приходы /
                  </h3>

                  <h3>{list.length}</h3>
                </div>
              </div>

              <div className={classNames(
                'orders container mx-0 p-0',
                { 'orders-anime': loaded },
              )}

              >
                <div className={classNames(
                  { 'col-md-5': isSelectedOrder },
                )}
                >
                  <Orders
                    onSelectOrder={handleSelectOrder}
                    isSelectedOrder={isSelectedOrder}
                    onSelectOrderToRemove={handleSelectOrderToRemove}
                    orderToRemove={orderToRemove}
                    isOrderRemove={isOrderRemove}
                    list={list}
                    handleIsPopupOpened={setIsPopupOpened}
                    handleSetIsOrderRemove={setIsOrderRemove}
                    handleSetList={setList}
                  />
                </div>

                <div className={classNames(
                  'col-md-7 mx-0 info-block',
                  { 'info-block--open': isSelectedOrder },
                )}
                >
                  <div
                    className="info-block__cross"
                    onClick={() => setIsSelectedOrder(false)}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="
                      info-block__cross-icon
                      fa-solid
                      fa-xmark
                      fa-sm"
                    />
                  </div>

                  <OrderInfoBlock
                    orderProducts={orderDetails}
                    orderName={orderName}
                  />
                </div>
              </div>

              {isPopupOpened && (
                <PopUp
                  orderToRemove={orderToRemove}
                  handleRemove={setIsOrderRemove}
                  handleIsPopupOpened={setIsPopupOpened}
                />
              )}
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
