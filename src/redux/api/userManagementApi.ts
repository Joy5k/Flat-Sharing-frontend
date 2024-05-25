import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const manageUserApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getAllUser: build.query({
         query: (arg) => {
            return {
               url: `/user?page=${arg.page}&limit=${arg.limit}`,
               method: 'GET',
            };
         },
         providesTags: [tagTypes.user],
      }),
      manageUser: build.mutation({
         query: (data) => {
            return {
               url:`/user/${data.userId}`,
               method: 'PATCH',
               data,
               contentType: 'application/json',
            };
         },
         invalidatesTags: [tagTypes.user],
      }),
   }),
});

export const { useGetAllUserQuery, useUpdateMYProfileMutation } = manageUserApi;
