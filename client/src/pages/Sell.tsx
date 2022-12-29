import React from 'react'
import {Stack, Grid} from "@mui/material";
import Category from '../components/Category';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import WeekendIcon from '@mui/icons-material/Weekend';
import PetsIcon from '@mui/icons-material/Pets';

const iconStyle = {height: "80px", width: "80px"};

const categories = [
    {name: "Cars", comp: <DirectionsCarIcon style = {iconStyle}/>},
    {name: "Properties", comp: <MapsHomeWorkIcon style = {iconStyle}/>},
    {name: "Phones", comp: <MobileFriendlyIcon style = {iconStyle}/>},
    {name: "Bikes", comp: <DirectionsBikeIcon style = {iconStyle}/>},
    {name: "Furniture", comp: <WeekendIcon style = {iconStyle}/>}, 
    {name: "Pets", comp: <PetsIcon style = {iconStyle}/>}]

const Sell = () => {
    return (
        <Stack direction = "column" alignItems="center" spacing = {2}>
            <h2 style = {{textAlign: "center"}}>Post your Ad</h2>
            <Grid container columns = {2} sx = {{border: "2px solid black", width: {xs: "95%", sm: "90%"}}}>
                {
                    categories.map((x, i) => {
                        return (
                            <Grid item key = {i} xs = {1}>
                                <Category title={x.name} comp={x.comp} />
                            </Grid>                                                        
                        )
                    })
                }
            </Grid>
        </Stack>
    )
}

export default Sell