import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { isExternalModuleNameRelative } from "typescript";
import { authActions } from "../features/auth/authSlice";

// https://olc.onrender.com/api
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    credentials: "include",
    prepareHeaders: (headers: Headers, api: any) => {
        const token = api.getState().auth.token;

        headers.set("authorization", `Bearer ${token}`);

        return headers;
    }
})  

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result: any = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403 || result?.error?.status === 403){
        // send refresh token to get back access token

        const refreshResult:any = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult?.data){

            // store the new token 
            api.dispatch(authActions.setToken(refreshResult?.data?.accessToken));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(authActions.logOut());
        }
    }   

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})