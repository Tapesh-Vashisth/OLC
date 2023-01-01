import React, {useEffect} from 'react'
import { Stack } from '@mui/material'

interface props{
    imgSrc: string | null
    price: number
    category: string
    title: string
    state: string
}

const Product = (props: props) => {
    
    return (
        <Stack className='product' direction = "column" spacing={3} style = {{border: "1px solid black", background: "white", cursor: "pointer"}}>
            {/* image  */}
            <Stack padding="20px 10px" alignItems="center" justifyContent="center">
                {
                    props.imgSrc ?                  
                    <img src={props.imgSrc} alt={props.category} style = {{maxWidth: "100%", height: "180px", boxShadow: "2px 2px 8px grey"}} /> :
                    <div style = {{width: "100%", height: "180px", boxShadow: "2px 2px 8px grey"}}>No image</div>
                }
            </Stack>
            {/* data  */}
            <Stack direction="column" padding="0px 10px" spacing={0}>
                <h3>&#8377; {props.price}</h3>
                <p style={{fontSize: "18px"}}>{props.category}</p>
                <p>{props.title}</p>
                <p style = {{fontSize: "14px"}}>location: {props.state}</p>
            </Stack>
        </Stack>
    )
}

export default Product