import React from 'react'
import {Stack} from "@mui/material";

interface props{
    category: string
    image: string | null
    title: string
    state: string
    price: number
    sold: boolean | null
}

const ProductCard = (props: props) => {
  return (
    <Stack direction="row" flexWrap="wrap" alignItems = "center" justifyContent="center" spacing = {1} style = {{borderBottom: "1px solid grey"}}>
        {
            props.image ?
            <img src = {props.image} style = {{width: "60px", height: "60px", borderRadius: "100%"}}></img>
            :
            <div>no image</div>        
        }

        <Stack direction = "row" alignItems="center" flexGrow = {1}>
            <div style = {{flexGrow: "1"}}>
                <p style = {{margin: "3px", fontSize: "17px"}}>{props.title} - &#8377;{props.price}</p>
                <p style = {{margin: "0px"}}>{props.category}</p>
                <p style = {{margin: "0px"}}>{props.state}</p>
            </div>

            <p>
                {props.sold === null ? null: props.sold ? "sold" : "unsold"}
            </p>
        </Stack>
    </Stack>
  )
}

export default ProductCard