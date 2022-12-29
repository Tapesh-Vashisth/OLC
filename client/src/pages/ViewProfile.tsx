import {Button} from "@mui/material";
import { useAppSelector } from "../store/hooks"
import {Grid, Stack} from "@mui/material";
import { NavLink } from "react-router-dom";

const ViewProfile = () => {
  const user = useAppSelector((state) => state.auth);

  return (
    <Grid container columns = {12} spacing = {3} padding = {3}>
      <Grid item xs = {12} sm = {3}>
        <Stack direction = "column" spacing = {2} alignItems = "center" >
          {
            user.profileImage ? 
            <img className = "proImage" src={`data:${user.profileImage["image"]["contentType"]};base64,${btoa(String.fromCharCode(...new Uint8Array(user.profileImage["image"]["data"]["data"])))}`}  alt="" /> 
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

            <p>ads</p>
          </section>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ViewProfile