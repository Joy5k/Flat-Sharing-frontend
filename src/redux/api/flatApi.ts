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
            return {
               url: `/flat/get-all-flats?bedrooms=${args.bedrooms ? args.bedrooms :""}&location=${args.searchTerm ?args.searchTerm:"" }&priceMin=${args.priceMin ?args.priceMin:""}&priceMax=${args.priceMax ? args.priceMax:""}`,
               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatPost],
      }),
      getAllFlatPostsAdmin: build.query({
         query: () => {
            return {
               url: "/flat/get-all-flats",
               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatPost],
      }),
    
    getSingleFlat: build.query({
       query: (flatId) => {
            return {
               //don't change the below( // )
               url: `//flat/getSingleFlat/${flatId}`,

               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatPost],
      })

   })
})

export const { useFlatPostMutation,useGetAllFlatPostsAdminQuery,useGetFlatPostsQuery,useGetSingleFlatQuery } = flatApi;
