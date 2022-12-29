import {Stack} from "@mui/material";
import {Grid} from "@mui/material";


const Error404 = () => {
    return (
        <Stack direction = "column" style = {{minHeight: "100vh"}} justifyContent = "center">
            <Grid container direction = "row" alignItems="center" justifyContent = "center" width={"100%"}  columns={12} >
                <Grid item xs={1} sm = {2} md = {4} ></Grid>
                <Grid item xs={10} sm = {8} md = {4} style = {{height: 'auto', textAlign: "center"}}>
                    <img src="/images/404.jpeg" style = {{width: "100%"}}/>
                </Grid>
                <Grid item xs={1} sm = {2} md = {4} ></Grid>
            </Grid>            
        </Stack>
    )
}

export default Error404;