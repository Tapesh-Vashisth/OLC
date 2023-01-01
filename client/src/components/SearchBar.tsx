import {useState} from "react";
import { TextField, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import baseurl from "../api/baseurl";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { productsActions } from "../features/product/productsSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [title, setTitle] = useState<string>("");
    const user = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const getAllProducts = async (endpoint: string) => {
        try {
            const response = await axios.get(baseurl + endpoint);
            dispatch(productsActions.setProducts(response.data));
        } catch (err: any) {
            alert("something went wrong");
        }
    }
    
    const handleSearch = () => {
        navigate("/");
        if (user.userId) {
            getAllProducts(`/products/getProducts/?limit=25&title=${title}&notUserId=${user.userId}`);
        }else { 
            getAllProducts(`/products/getProducts/?limit=25&title=${title}`);
        }
        if (title === ""){
            dispatch(productsActions.setFilter({category: "all", state: "all", price: "all"}));
        }else{
            dispatch(productsActions.setFilter({category: "no", state: "no", price: "no"}));
        }
    }

    return (
        <Stack direction = "row" alignItems="center">
            <TextField
                type="text"
                inputProps={{
                    style : {
                        padding: "4px"
                    }
                }}
                sx = {{margin: "2px", color: "black", background: "white"}}
                placeholder="search title"
                value = {title}
                onChange = {handleChange}
                />
            <SearchIcon style = {{width: "30px", cursor: "pointer"}} onClick = {handleSearch} />        
        </Stack>
    )
}

export default SearchBar