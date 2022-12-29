import { apiSlice } from "../../api/apiSlice";
import { authActions } from "./authSlice";
import store from "../../store/store";
import { StringDecoder } from "string_decoder";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
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
        })
    })
})

export const {useLoginMutation, useSignupMutation, useGetUserDetailsQuery} = authApiSlice;