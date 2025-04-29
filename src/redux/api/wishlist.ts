
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

const storedProducts = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('products') || '[]') : [];

export interface Product {
  id: string;
  name: string;
  price: number;
  rentAmount: number;
  bedrooms: number;
  description: string;
  location: string;
  image: string;
  photos: string[]; // Assuming it's an array of image URLs
  userId: string;
  createdAt: string; // You can use `Date` if you parse it before usage
  updatedAt: string;
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
      if(!state.products.some(product => product.id === action.payload.id)) {
        state.products.push(action.payload);  
        localStorage.setItem('products', JSON.stringify(state.products));
        console.log(action.payload, 'added to wishlist!')
      }else {
        toast.warning("Already in wishlist!");
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product: Product) => product.id !==action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    clearProducts: (state) => {
      state.products = [];

      localStorage.removeItem('products');
    },
    getProducts: (state) => {
        const products = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('products') || '[]') : [];
        state.products = products;
        return products;
          },
      
          setFlats: (state, action: PayloadAction<any>) => {  localStorage.setItem('flats', JSON.stringify(action.payload));

           
        },
        getFlats: (state) => {
            const flats = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('flats') || '[]') : [];
            state.products = flats;
            return flats;
        }
  }
});

export const { addProduct,clearProducts,removeProduct,getProducts,setFlats,getFlats } = productSlice.actions;
export default productSlice.reducer;
