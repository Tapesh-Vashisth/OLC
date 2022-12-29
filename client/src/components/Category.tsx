import React from 'react'
import {Stack} from "@mui/material";

interface props{
    title: string,
    comp: React.ReactElement
}

const Category = (props: props) => {
  return (
    <Stack direction="column" alignItems = "center" spacing = {1} padding = "40px" style={{border: "2px solid black"}}>
        {props.comp}
        <h4>
            {props.title}        
        </h4>
    </Stack>
  )
}

export default Category