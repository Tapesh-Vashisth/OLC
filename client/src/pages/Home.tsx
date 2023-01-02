import {useEffect, useRef, useState} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import axios from "axios"
import {Grid, Stack, Button, CircularProgress} from "@mui/material";
import baseurl from "../api/baseurl";
import Product from "../components/Product";
import { productsActions } from "../features/product/productsSlice";
import { NavLink } from "react-router-dom";
import Filter from "../components/Filter";

const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth); 
  const products = useAppSelector((state) => state.product);
  const [loading, setLoading] = useState<boolean>(false);
  const loadRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  
  const getAllProducts = async (endpoint: string) => {
    setLoading(true);

    try {
      const response = await axios.get(baseurl + endpoint);
      dispatch(productsActions.setProducts(response.data));
    } catch (err: any) {
      alert("server not responding");
    }

    setLoading(false);
  }
  
  const addProducts = async (endpoint: string) => {
    setLoading(true);

    try {
      const response = await axios.get(baseurl + endpoint);
      if (response.data && response.data.length === 0){
        setVisible(true);
      }
      dispatch(productsActions.addProducts(response.data));
    } catch (err: any) {
      alert("something went wrong");
    }

    setLoading(false);
  }

  const handleLoadMore = async () => {
    setVisible(false);
    addProducts(`/products/getProducts/?limit=8&skip=${products.productsCollection.length}&state=${products.filter.state}&category=${products.filter.category}&sold=false`);
  }
  
  useEffect(() => {
    if (products.filter.category === "load" && products.filter.state === "load" && products.filter.price === "load"){
      dispatch(productsActions.setFilter({category: "all", state: "all", price: "all"}));
      getAllProducts(`/products/getProducts/?limit=1&sold=false&skip=0`);
    }
  }, []);

  return (
    <>
      <Stack direction = "row" justifyContent="right" padding={1}>
        <Filter getProducts = {getAllProducts} />
      </Stack>
      <Stack direction = "column" style = {{padding: "20px"}} spacing = {3} alignItems = "center">
        <Grid container columns = {12} rowGap = {3} spacing = {2}>
            {
              products.productsCollection.length > 0 ?
                products.productsCollection.map((x: any, i) => {

                  return (
                    x.seller !== user.userId ? 
                    <Grid key = {i} item xs = {12} sm = {4} md = {3}>
                      <NavLink to={`/product/${x.productId}`} style = {{textDecoration: "none", color: "black"}}>
                        <Product imgSrc={x.images.length > 0 ? x.images[0]: null} category={x.category} price={x.price} title={x.title} state={x.state} />
                      </NavLink>
                    </Grid> :
                    null
                  )
                })
              :
                null
            }
        </Grid>
        <p style={{color: "red", display: visible ? "block" : "none"}}>No more Products</p>
        <Button ref = {loadRef} disabled = {loading} style = {{border: "1px solid red", color: "blue"}} onClick = {handleLoadMore}>
          {
            loading ? 
            <CircularProgress /> :
            `load more`
          }
        </Button>
      </Stack>
    </>
  )
}

export default Home