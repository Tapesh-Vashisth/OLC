import { useState, useEffect } from "react";
import {Button} from "@mui/material";
import { useAppSelector } from "../store/hooks"
import {Grid, Stack} from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";
import baseurl from "../api/baseurl";
import ProductCard from "../components/ProductCard";

const ViewProfile = () => {
  const user = useAppSelector((state) => state.auth);
  const [ads, setAds] = useState<any []>([]);
  
  const getProducts = async () => {
    try {
      const response = await axios.get(baseurl + "/auth/user/getUserProducts/" + user.userId);    
      setAds(response.data);
    } catch (err) {
      alert("couldn't fetch ads");
    }
  }

  useEffect(() => {
    if (user.userId){
      getProducts();
    }
  }, [user])

  return (
    <Grid container columns = {12} spacing = {3} padding = {3}>
      <Grid item xs = {12} sm = {3}>
        <Stack direction = "column" spacing = {2} alignItems = "center" >
          {
            user.profileImage ? 
            <img className = "proImage" src={user.profileImage}  alt="" /> 
            :
            <Stack className="proImage" style={{background: "grey"}} justifyContent = "center" alignItems = "center">No Image</Stack>
          }
          <NavLink to = "/editProfile" style = {{textDecoration: "none", textAlign: "center"}}><Button sx = {{background: "pink"}}>Edit profile</Button></NavLink>
        </Stack>
      </Grid>

      <Grid item xs = {12} sm = {9}>
        <Stack direction = "column">
          <section>
            <Stack direction = "column" sx = {{textAlign: {xs: "center", sm: "left"}}}>
              <h1>{user.name}</h1>
              <p>{user.description}</p>
            </Stack>
          </section>
          <hr />
          <section style = {{minHeight: "350px"}}>
            <Stack direction = "column" spacing = {3}>
              <h2 className = "center">Your Ads</h2>
              {
                ads.length > 0 ?
                ads.map((x, i) => {
                  return (
                    <ProductCard key = {i} category = {x.category} title = {x.title} price = {x.price} image = {x.images.length > 0 ? x.images[0]: null} state = {x.state} sold = {x.sold} />
                  )
                })
                :
                <p>NO ADS</p>
              }
            </Stack>
          </section>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ViewProfile