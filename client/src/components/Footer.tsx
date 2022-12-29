import { Stack, Grid } from "@mui/material"
import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <Grid container columns = {12} spacing = {2} sx = {{textAlign: {xs: "center", sm: "left"}}} style = {{backgroundColor: "grey", padding: "20px"}}>
        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Popular locations</h4>
                <p>Kolkata</p>
                <p>Mumbai</p>
                <p>Chennai</p>
                <p>Pune</p>
            </Stack>                
        </Grid>
        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Popular locations</h4>
                <p>Kolkata</p>
                <p>Mumbai</p>
                <p>Chennai</p>
                <p>Pune</p>
            </Stack>
        </Grid>
        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Popular locations</h4>
                <p>Kolkata</p>
                <p>Mumbai</p>
                <p>Chennai</p>
                <p>Pune</p>
            </Stack>
        </Grid>
        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Popular locations</h4>
                <p>Kolkata</p>
                <p>Mumbai</p>
                <p>Chennai</p>
                <p>Pune</p>
            </Stack>
        </Grid>
    </Grid>
  )
}

export default Footer