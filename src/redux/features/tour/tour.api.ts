import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        addTourType : builder.mutation({
            query:(tourTypeName) =>({
                url : "/tour/create-tour-type",
                method : "POST",
                data : tourTypeName
            }),
            invalidatesTags : ["TourType"]
        }),
        getTourType : builder.query({
            query:() =>({
                url : "/tour/tour-types",
                method : "GET",
            }),
            providesTags : ["TourType"]
            // transformResponse : (response)=> response.data
        }),

        deleteTourType : builder.mutation({
            query : (tourTypeId) =>({
                url : `/tour/tour-type/${tourTypeId}`,
                method : "DELETE"
            }),
            invalidatesTags :["TourType"]
        }),

        updateTourType : builder.mutation({
            query : ({tourTypeId,payload})=>({
                url : `/tour/tour-type/${tourTypeId}`,
                method : "PATCH",
                data : payload
            }),
            invalidatesTags: ["TourType"]
        })
    })
})


export const {useAddTourTypeMutation,useGetTourTypeQuery,useDeleteTourTypeMutation,useUpdateTourTypeMutation} = tourApi