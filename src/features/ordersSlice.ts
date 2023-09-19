import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { getOrders } from '../api/getOrders';
import { ErrorType } from '../types/Error';
import { OrderType } from '../types/Order';

type OrdersState = {
  orderList: OrderType[],
  loaded: boolean,
  isError: ErrorType | null,
};

const initialState: OrdersState = {
  orderList: [],
  loaded: false,
  isError: null,
};

export const loadOrders = createAsyncThunk('orders/fetch', () => {
  return getOrders();
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderType[]>) => ({
      ...state,
      orderList: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(loadOrders.pending, (state) => ({
      ...state,
      loaded: false,
      isError: null,
    }));

    builder.addCase(loadOrders.fulfilled, (state, action) => ({
      ...state,
      orderList: action.payload,
      loaded: true,
      isError: null,
    }));

    builder.addCase(loadOrders.rejected, (state) => ({
      ...state,
      isError: ErrorType.GET_PRODUCTS,
      loaded: true,
    }));
  },
});

export default ordersSlice.reducer;
export const { setOrders } = ordersSlice.actions;
