import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const flatRequestApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      flatRequestPost: build.mutation({
         query: (data) => {
            console.log(data,'get the flatId')
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
               //don't change the below( // )
               url: "flat-share-request/getAllFlatRequest",

               method: 'GET',
            }
         },
         providesTags: [tagTypes.flatRequestPost],
      })

   })
})

export const { useFlatRequestPostMutation,useGetAllFlatRequestQuery } = flatRequestApi;
