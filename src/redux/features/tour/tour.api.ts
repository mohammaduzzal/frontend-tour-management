import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // tour api
        addTour: builder.mutation({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData
            }),
            invalidatesTags: ["Tour"]
        }),


        // tour type api
        addTourType: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["TourType"]
        }),
        getTourType: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET",
            }),
            providesTags: ["TourType"]
            // transformResponse : (response)=> response.data
        }),

        deleteTourType: builder.mutation({
            query: (tourTypeId) => ({
                url: `/tour/tour-type/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TourType"]
        }),

        updateTourType: builder.mutation({
            query: ({ tourTypeId, payload }) => ({
                url: `/tour/tour-type/${tourTypeId}`,
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: ["TourType"]
        })
    })
})


export const { 

    // tour
    useAddTourMutation,

    // tourType
    useAddTourTypeMutation,
    useGetTourTypeQuery,
    useDeleteTourTypeMutation,
    useUpdateTourTypeMutation

} = tourApi