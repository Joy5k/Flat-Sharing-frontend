import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const flatApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
    flatPost: build.mutation({
        query: (data) => {
           return {
              url: '/flat/create-flat',
              method: 'POST',
              data,
              contentType: 'application/json',
           };
        },
        invalidatesTags: [tagTypes.flatPost],
    }),
    getFlatPosts:build.query({
      query:(args)=>{
         return {
            url:"/flat/get-all-flats",
            // url:`/flat/get-all-flats?bedrooms=${args.bedrooms}&location=${args.location}&minPrice=${args.minPrice}&maxPrice=${args.maxPrice}`,
            method: 'GET',
         }
      },
      providesTags: [tagTypes.flatPost],
     })
  }),
  

});

export const { useFlatPostMutation,useGetFlatPostsQuery } = flatApi;
