import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const flatRequestApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      flatRequestPost: build.mutation({
         query: (data) => {
            return {
               url: '/flat-share-request/create',
               method: 'POST',
               data:{flatId:data},
               contentType: 'application/json',
            };
         },
         invalidatesTags: [tagTypes.flatRequestPost],
      }),
      
    
    getAllFlatRequest: build.query({
       query: () => {
            return {
               url: "/flat-share-request/getAllFlatRequest",
               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatRequestPost],
      }),
      getAllFlatRequestForAdmin:build.query({
         query:()=>{
            return{
               url:"/flat-share-request/getAllFlatRequestForAdmin",
               method:"GET"
            }
         },
         providesTags: [tagTypes.flatRequestPost],
      })

   })
})

export const { useFlatRequestPostMutation,useGetAllFlatRequestQuery,useGetAllFlatRequestForAdminQuery } = flatRequestApi;
