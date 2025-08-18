import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData
            }),
            invalidatesTags: ["Division"]
        }),
        getDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET",
            }),
            providesTags: ["Division"]
            // transformResponse : (response)=> response.data
        }),
        deleteDivision: builder.mutation({
            query: (divisionId) => ({
                url: `/division/${divisionId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Division"]
        }),
        updateDivision : builder.mutation({
            query : ({divisionId,payload})=>({
                url : `/division/${divisionId}`,
                method : "PATCH",
                data : payload
            }),
            invalidatesTags: ["Division"]
        }),
        getSingleDivision : builder.query({
            query : (divisionSlug) =>({
                url:`/division/${divisionSlug}`,
                method : "GET",
            })
        })
    }),
})


export const { useAddDivisionMutation, useGetDivisionQuery,useDeleteDivisionMutation,useUpdateDivisionMutation,useGetSingleDivisionQuery } = divisionApi