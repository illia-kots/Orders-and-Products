import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Filter } from '../../components/Filter';
import { Loader } from '../../components/Loader';
import { Products } from '../../components/Products';
import { loadOrders } from '../../features/ordersSlice';
import { loadProducts } from '../../features/productsSlice';
import { ErrorType } from '../../types/Error';

export const ProductsPage = () => {
  const { items, isError, loaded } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const routeCategory = location.pathname.slice(1);

  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadProducts());
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
              {ErrorType.GET_PRODUCTS}
            </div>
          ) : (
            <>
              <div className="products-wrapper">
                <div className="products__count">
                  <h3 className="m-0">
                    Продукты /
                  </h3>
                  <h3>{items.length}</h3>
                </div>

                <Filter />
              </div>
              <Products />
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
