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
  }),

});

export const { useFlatPostMutation } = flatApi;
