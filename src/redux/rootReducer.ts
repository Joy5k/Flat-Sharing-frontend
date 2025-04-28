import { baseApi } from "./api/baseApi";
import productReducer from "./api/wishlist";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  product:productReducer
};
