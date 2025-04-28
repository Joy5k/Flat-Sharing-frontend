
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get } from 'http';
import { useGetFlatPostsQuery } from './flatApi';

const storedProducts = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('products') || '[]') : [];

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: storedProducts
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<any>) => {
      state.products.push(action.payload);

      // LocalStorage-এ Save করা
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);

      // LocalStorage-এ Update করা
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    clearProducts: (state) => {
      state.products = [];

      // LocalStorage-এ Clear করা
      localStorage.removeItem('products');
    },
    getProducts: (state) => {
      // LocalStorage থেকে প্রোডাক্টস নিয়ে আসা
        const products = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('products') || '[]') : [];
        state.products = products;
        return products;
    },
    getAccessToken: (state, action: PayloadAction<string>) => {
        const token = action.payload;
        if (typeof window !== "undefined") {
            localStorage.getItem('accessToken');
        }
        },
        setFlats: (state, action: PayloadAction<any>) => {
            
            localStorage.setItem('flats', JSON.stringify(action.payload));

           
        },
        getFlats: (state) => {
            const flats = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('flats') || '[]') : [];
            state.products = flats;
            return flats;
        }
  }
});

export const { addProduct,getAccessToken,clearProducts,removeProduct,getProducts,setFlats,getFlats } = productSlice.actions;
export default productSlice.reducer;
