import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { getProducts } from '../api/getProducts';
import { ErrorType } from '../types/Error';
import { ProductType } from '../types/Product';

type ProductsState = {
  items: ProductType[],
  loaded: boolean,
  isError: ErrorType | null,
};

const initialState: ProductsState = {
  items: [],
  loaded: false,
  isError: null,
};

export const loadProducts = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => ({
      ...state,
      items: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(loadProducts.pending, (state) => ({
      ...state,
      loaded: false,
      isError: null,
    }));

    builder.addCase(loadProducts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
      isError: null,
    }));

    builder.addCase(loadProducts.rejected, (state) => ({
      ...state,
      isError: ErrorType.GET_PRODUCTS,
      loaded: true,
    }));
  },
});

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
