import { createSlice } from "@reduxjs/toolkit";

interface product{
    productId: string
    category: string
    title: string
    price: number
    images: string []
    description: string
    location: string
    state: string
}

interface initialState{
    productsCollection: product [],
    filter: {
        category: string
        state: string
        price: string
    }
}

const initialState: initialState = {
    productsCollection: [],
    filter: {
        category: "all",
        state: "all",
        price: "all"
    }
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.productsCollection.push(...action.payload);
        },
        setProducts: (state, action) => {
            state.productsCollection = action.payload;
        },
        setFilter: (state, action) => {
            state.filter.category = action.payload.category;
            state.filter.state = action.payload.state;
            state.filter.price = action.payload.price;
        }
    }
})

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;