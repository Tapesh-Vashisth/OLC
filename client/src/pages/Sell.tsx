import React from 'react'
import {Stack, Grid} from "@mui/material";
import Category from '../components/Category';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import WeekendIcon from '@mui/icons-material/Weekend';
import PetsIcon from '@mui/icons-material/Pets';
import { NavLink } from 'react-router-dom';

const iconStyle = {height: "60px", width: "60px"};

const categories = [
    {name: "Cars", comp: <DirectionsCarIcon style = {iconStyle}/>},
    {name: "Properties", comp: <MapsHomeWorkIcon style = {iconStyle}/>},
    {name: "Phones", comp: <MobileFriendlyIcon style = {iconStyle}/>},
    {name: "Bikes", comp: <DirectionsBikeIcon style = {iconStyle}/>},
    {name: "Furniture", comp: <WeekendIcon style = {iconStyle}/>}, 
    {name: "Pets", comp: <PetsIcon style = {iconStyle}/>}]

const Sell = () => {
    return (
        <Stack direction = "column" alignItems="center" spacing = {2} marginBottom = "30px">
            <h2 style = {{textAlign: "center"}}>Post your Ad</h2>
            <h4 style = {{textAlign: "center"}}>Choose A Category</h4>
            <Grid container columns = {2} sx = {{border: "2px solid black", width: {xs: "95%", sm: "90%"}}}>
                {
                    categories.map((x, i) => {
                        return (
                            <Grid item key = {i} className='category pointer' xs = {1}>
                                <NavLink to = {`/sell/${x.name}`} style = {{textDecoration: "none", color: "black"}}>
                                    <Category title={x.name} comp={x.comp} />
                                </NavLink>
                            </Grid>                                                        
                        )
                    })
                }
            </Grid>
        </Stack>
    )
}

export default Sell