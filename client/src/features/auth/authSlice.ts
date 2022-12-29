import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {name, email, accessToken} = action.payload;
            state.name = name;
            state.email = email;
            state.token = accessToken;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
        ,
        logOut: (state) => {
            state.name = "";
            state.email = "";
            state.token = "";
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserName = (state: any) => state.auth.name;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentEmail = (state: any) => state.auth.email;