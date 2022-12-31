import { apiSlice } from "../../api/apiSlice";
import store from "../../store/store";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addProduct: builder.mutation({
            query: productData => ({
                url: "/products/addProduct",
                method: "POST",
                body: productData
            })
        }),
        buyProduct: builder.mutation({
            query: productData => ({
                url: "/products/buyProduct",
                method: "POST",
                body: {...productData}
            })
        }),
    })
})

export const {useAddProductMutation, useBuyProductMutation} = productApiSlice;