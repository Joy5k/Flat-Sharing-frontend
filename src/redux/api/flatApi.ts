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
      
      getFlatPosts: build.query({
         query: (args) => {
            console.log(args,"this is argumetn in redux")
            return {
               url: `/flat/get-all-flats?bedrooms=${args.bedrooms && args.bedrooms}&location=${args.searchTerm}&priceMin=${args.minPrice}&priceMax=${args.maxPrice}`,
               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatPost],
      }),
    
    getSingleFlat: build.query({
       query: (flatId) => {
          console.log(flatId.flatId,'The flat id is ')
            return {
               url: `/flat/getSingleFlat/${flatId.flatId}`,
               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatPost],
      })

   })
})

export const { useFlatPostMutation,useGetFlatPostsQuery,useGetSingleFlatQuery } = flatApi;
