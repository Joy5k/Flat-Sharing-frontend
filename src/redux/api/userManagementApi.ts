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
      changeUserStatus: build.mutation({
         query: ({userId,status}) => {
            console.log(userId,status,'redux api')
            return {
               url:`/user/${userId}/status`,
               method: 'PATCH',
               data:{status},
               contentType: 'application/json',
            };
         },
         invalidatesTags: [tagTypes.user],
      }),
      changeUserRole: build.mutation({
         query: ({userId,role}) => {
            console.log(userId,role,'redux api role change')
            return {
               url:`/user/${userId}/role`,
               method: 'PATCH',
               data:{role},
               contentType: 'application/json',
            };
         },
         invalidatesTags: [tagTypes.user],
      }),
   }),
});

export const { useGetAllUserQuery, useChangeUserStatusMutation,useChangeUserRoleMutation } = manageUserApi;
