import { apiSlice } from "../../api/apiSlice";
import { authActions } from "./authSlice";
import store from "../../store/store";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfileImage: builder.query<any, void>({
            query: () => ({
                url: "/auth/user/getProfileImage",
                credentials: "include"
            }),
        }),
        getUserDetails: builder.query<any, void>({
            query: () => ({
                url: "/auth/user/userDetails",
                credentials: "include"
            }),
            async onQueryStarted(args, api: any) {
                try {
                    const {data} = await api.queryFulfilled;       
                    api.dispatch(authActions.setCredentials({...data, accessToken: store.getState().auth.token}));
                } catch (err) {console.log(err)}
            }
        }),
        updateProfileImage: builder.mutation({
            query: formdata => ({
                url: "/auth/user/updateProfileImage",
                method: "POST",
                body: {...formdata}
            })
        }),
        updateProfile: builder.mutation({
            query: details => ({
                url: "/auth/user/updateDetails",
                method: "POST",
                body: { ...details }
            })
        }),        
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/user/login",
                method: "POST",
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: "/auth/user/signup",
                method: "POST",
                body: {...credentials}
            })
        }),
        logout: builder.mutation<any, void>({
            query: () => ({
                url: "/auth/user/logout",
                method: "GET"
            })
        })
    })
})

export const {useLoginMutation, useSignupMutation, useGetUserDetailsQuery, useLogoutMutation, useUpdateProfileMutation, useUpdateProfileImageMutation, useGetProfileImageQuery} = authApiSlice;