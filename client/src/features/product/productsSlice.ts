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
        category: "load",
        state: "load",
        price: "load"
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
        },
        removeProduct: (state, action) => {
            state.productsCollection = state.productsCollection.filter((x) => {
                return x.productId !== action.payload;
            })
        }
    }
})

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;