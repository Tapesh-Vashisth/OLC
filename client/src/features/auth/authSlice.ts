import { createSlice } from "@reduxjs/toolkit";

interface initialState{
    userId: string
    name: string
    email: string
    token: string
    description: string
    profileImage: string
    phoneNumber: string
    products: string []
    bought: string []
}

const initialState: initialState = {
    userId: "",
    name: "",
    email: "",
    token: "",
    profileImage: "",
    description: "",
    phoneNumber: "",
    products: [],
    bought: []
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
            const {userId, name, email, accessToken, profileImage, description, phoneNumber, bought, products} = action.payload;
            state.userId = userId;
            state.name = name;
            state.email = email;
            state.token = accessToken;
            state.profileImage = profileImage;
            state.description = description;
            state.phoneNumber = phoneNumber;
            state.bought = bought;
            state.products = products;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.userId = "";
            state.name = "";
            state.email = "";
            state.token = "";
            state.profileImage = "";
            state.description = "";
            state.phoneNumber = "";
            state.products = [];
            state.bought = [];
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserName = (state: any) => state.auth.name;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentEmail = (state: any) => state.auth.email;