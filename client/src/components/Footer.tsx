import { Stack, Grid } from "@mui/material"
import { NavLink } from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Grid container columns = {12} spacing = {2} sx = {{textAlign: {xs: "center", sm: "left"}}} style = {{backgroundColor: "black", color: "grey", padding: "20px"}}>
        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Popular locations</h4>
                <p style={{fontSize: "12px"}}>Kolkata</p>
                <p style={{fontSize: "12px"}}>Mumbai</p>
                <p style={{fontSize: "12px"}}>Chennai</p>
                <p style={{fontSize: "12px"}}>Pune</p>
            </Stack>
        </Grid>

        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Trending locations</h4>
                <p style={{fontSize: "12px"}}>Delhi</p>
                <p style={{fontSize: "12px"}}>Hyderabad</p>
                <p style={{fontSize: "12px"}}>Chennai</p>
            </Stack>                
        </Grid>

        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Quick Links</h4>
                <p style = {{marginBottom: "0px", padding: "0px"}}>
                    <NavLink style={{fontSize: "12px", textDecoration: "none", color: "grey"}} to = "/sell">
                            Sell your products
                    </NavLink>
                </p>
                <p style = {{marginBottom: "0px", padding: "0px"}}>
                    <NavLink style={{fontSize: "12px", textDecoration: "none", color: "grey"}} to = "/about">
                            About us
                    </NavLink>
                </p>
            </Stack>                
        </Grid>

        <Grid item xs = {6} sm = {3}>
            <Stack direction = "column" spacing = {1}>
                <h4>Follow us</h4>
                <Stack direction = "row" sx = {{justifyContent: {xs: "center", sm: "left"}}}>
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                </Stack>                
            </Stack>                
        </Grid>
    </Grid>
  )
}

export default Footer