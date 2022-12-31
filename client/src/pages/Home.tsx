import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import axios from "axios"
import {Grid, Stack, Button} from "@mui/material";
import baseurl from "../api/baseurl";
import Product from "../components/Product";
import { productsActions } from "../features/product/productsSlice";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth); 
  const products = useAppSelector((state) => state.product);

  const getAllProducts = async (endpoint: string) => {
    try {
      const response = await axios.get(baseurl + endpoint);
      console.log(response.data);
      dispatch(productsActions.setProducts(response.data));
    } catch (err: any) {
      console.log("something went wrong");
    }
  }
                                                            
  useEffect(() => {
    console.log("get products");
    if (user.userId){
      getAllProducts(`/products/getProducts/?limit=25&notUserId=${user.userId}`);
    }else{
      getAllProducts(`/products/getProducts/?limit=25`);
    }
  }, [user]);

  return (
    <Stack direction = "column" style = {{padding: "20px"}} spacing = {3} alignItems = "center">
      <Grid container columns = {12} rowGap = {3} spacing = {2}>
          {
            products.productsCollection.length > 0 ?
              products.productsCollection.map((x, i) => {
                return (
                  <Grid key = {i} item xs = {12} sm = {4} md = {3}>
                    <NavLink to={`/product/${x.productId}`} style = {{textDecoration: "none", color: "black"}}>
                      <Product imgSrc={x.images.length > 0 ? x.images[0]: null} category={x.category} price={x.price} title={x.title} state={x.state} />
                    </NavLink>
                  </Grid>
                )
              })
            :
              null
          }
      </Grid>
      <Button style = {{backgroundColor: "lightGreen"}}>
        load more
      </Button>
    </Stack>
  )
}

export default Home