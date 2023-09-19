import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from '../features/ordersSlice';
import productsReducer from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
