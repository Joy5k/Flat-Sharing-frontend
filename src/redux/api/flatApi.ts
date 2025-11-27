import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const flatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    flatPost: build.mutation({
      query: (data) => {
        return {
          url: "/flat/create-flat",
          method: "POST",
          data,
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.flatPost],
    }),

    getFlatPosts: build.query({
      query: (args) => {
        return {
          url: `/flat/get-all-flats?bedrooms=${
            args.bedrooms ? args.bedrooms : ""
          }&location=${args.searchTerm ? args.searchTerm : ""}&priceMin=${
            args.priceMin ? args.priceMin : ""
          }&priceMax=${args.priceMax ? args.priceMax : ""}`,
          method: "GET",
        };
        
      },
      providesTags: [tagTypes.flatPost],
    }),
    getAllFlatPostsAdmin: build.query({
      query: () => {
        return {
          url: "/flat/get-all-flats",
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatPost],
    }),

// retrive all flats(deleted or deactivated) by super admin

    getAllFlatBySuperAdmin: build.query({
      query: () => {
        return {
          url: "/flat/get-all-flats-by-super-admin",
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatPost],
    }),




    getAllMyFlats: build.query({
      query: () => {
        return {
          url: "/flat/get-my-flats",
          method: "GET",
        };
      },
      providesTags: [tagTypes.flatPost],
    }),

    getSingleFlat: build.query({
      query: (flatId) => {
        return {
          //don't change the below( // )
          url: `/flat/getSingleFlat/${flatId}`,

          method: "GET",
        };
      },
      providesTags: [tagTypes.flatPost],
    }),

    updateFlatByAdmin: build.mutation({
       query: (data) => {
        return {
          url: `/flat/updateFLat/${data.flatId}`,
          method: "PATCH",
          data: data.flatData,
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.flatPost],
    }),

    // activate deactivated all flats by super admin
    activeateDeactivatedFlatBySuperAdmin:build.mutation({
      query:(id)=>{
        return {
          url:`/flat/activeFlat/${id}`,
          method:"PUT"
        }
      },
            invalidatesTags: [tagTypes.flatPost],

    }),

//retrive all deleted flat by super admin
retriveDeletedFlatBySuperAdmin:build.mutation({
  query:(id)=>{
    return {
      url :`/flat/retriveDeletedFlat/${id}`,
      method:"PUT"
    }
  },
        invalidatesTags: [tagTypes.flatPost],

}),



    deleteFlatByAdmin: build.mutation({
       query: (flatId) => {
        return {
          url: `/flat/deleteFlat/${flatId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.flatPost],
    }),
  }),
});

export const {
  useFlatPostMutation,
  useGetAllFlatPostsAdminQuery,
  useGetFlatPostsQuery,
  useGetAllFlatBySuperAdminQuery,
   useGetSingleFlatQuery,
  useUpdateFlatByAdminMutation,
  useDeleteFlatByAdminMutation,
  useActiveateDeactivatedFlatBySuperAdminMutation,
  useRetriveDeletedFlatBySuperAdminMutation,
  useGetAllMyFlatsQuery
} = flatApi;
