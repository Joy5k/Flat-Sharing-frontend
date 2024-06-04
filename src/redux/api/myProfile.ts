import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export const profileAPi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getMYProfile: build.query({
         query: () => {
            return {
               url: '/user/me',
               method: 'GET',
            };
         },
         providesTags: [tagTypes.user],
      }),
      updateMYProfile: build.mutation({
         query: (data) => {
            return {
               url: '/user/editProfile',
               method: 'PATCH',
               data:{
                  username:data?.username,
                  email:data?.email
               },
               contentType: 'application/json',
            };
         },
         invalidatesTags: [tagTypes.user],
      }),
   }),
});

export const { useGetMYProfileQuery, useUpdateMYProfileMutation } = profileAPi;
