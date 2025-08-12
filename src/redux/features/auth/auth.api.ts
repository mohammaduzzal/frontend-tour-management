import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";




export const authApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        login :builder.mutation({
            query: (userInfo)=>({
                url:"/auth/login",
                method: "POST",
                data: userInfo
            }),
        }),
        logout : builder.mutation({
            query  : ()=>({
                url : "/auth/logout",
                method : "POST"
            }),
            invalidatesTags : ["User"]
        }),
        register : builder.mutation({
            query : (userInfo)=>({
                url : "/user/register",
                method : "POST",
                data : userInfo
            })
        }),
        sendOpt : builder.mutation<IResponse<null>,ISendOtp>({
            query : (userInfo)=>({
                url : "/otp/send",
                method:"POST",
                data:userInfo
            })
        }),
        verifyOpt : builder.mutation<IResponse<null>,IVerifyOtp>({
            query : (userInfo)=>({
                url : "/otp/verify",
                method:"POST",
                data:userInfo
            })
        }),
        userInfo : builder.query({
            query : ()=>({
                url : "/user/me",
                method : "GET"
            
            }),
            providesTags : ["User"]
        })
    })
})


export const {useRegisterMutation,useLoginMutation,useSendOptMutation,useVerifyOptMutation,useUserInfoQuery,useLogoutMutation} = authApi