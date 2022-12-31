import {useState} from "react";
import { TextField, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import baseurl from "../api/baseurl";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { productsActions } from "../features/product/productsSlice";

const SearchBar = () => {
    const [title, setTitle] = useState<string>("");
    const user = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const getAllProducts = async (endpoint: string) => {
        try {
            const response = await axios.get(baseurl + endpoint);
            console.log(response.data);
            dispatch(productsActions.setProducts(response.data));
            dispatch(productsActions.setFilter({category: "no", state: "no", price: "no"}));
        } catch (err: any) {
            console.log("something went wrong");
        }
    }

    const handleSearch = () => {
        if (user.userId) {
            getAllProducts(`/products/getProducts/?limit=25&title=${title}&notUserId=${user.userId}`);
        }else { 
            getAllProducts(`/products/getProducts/?limit=25&title=${title}`);
        }
    }

    return (
        <Stack direction = "row" alignItems="center">
            <TextField
                type="text"
                sx = {{ margin: "2px", color: "black", background: "white"}}
                placeholder="search title"
                value = {title}
                onChange = {handleChange}
                />
            <SearchIcon style = {{width: "30px", cursor: "pointer"}} onClick = {handleSearch} />        
        </Stack>
    )
}

export default SearchBar