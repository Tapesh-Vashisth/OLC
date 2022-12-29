import { createSlice } from "@reduxjs/toolkit";

interface initialState{
    name: string
    email: string
    token: string
    description: string
    profileImage: any
    phoneNumber: string
}

const initialState: initialState = {
    name: "",
    email: "",
    token: "",
    profileImage: null,
    description: "",
    phoneNumber: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },
        updateProfile: (state, action) => {
            const {name, phoneNumber, description} = action.payload;
            state.name = name;
            state.phoneNumber = phoneNumber;
            state.description = description;
        },
        setCredentials: (state, action) => {
            const {name, email, accessToken, profileImage, description, phoneNumber} = action.payload;
            state.name = name;
            state.email = email;
            state.token = accessToken;
            state.profileImage = profileImage;
            state.description = description;
            state.phoneNumber = phoneNumber;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.name = "";
            state.email = "";
            state.token = "";
            state.profileImage = null;
            state.description = "";
            state.phoneNumber = "";
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserName = (state: any) => state.auth.name;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentEmail = (state: any) => state.auth.email;