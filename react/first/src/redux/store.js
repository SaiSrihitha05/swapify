// store.js

import { configureStore } from '@reduxjs/toolkit';
import buyerSellerReducer from './slices/buyerSellerSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    buyerSellerLoginReducer: buyerSellerReducer,
    cart: cartReducer
  }
});
