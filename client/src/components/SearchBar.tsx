import {useState} from "react";
import { TextField, Stack, CircularProgress } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import baseurl from "../api/baseurl";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { productsActions } from "../features/product/productsSlice";
import { useNavigate } from "react-router-dom";

interface props{
    loadVisibility: (state: boolean) => void
}

const SearchBar = () => {
    const [loading, setLoading] = useState<boolean>(false);
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

        setLoading(false);
    }
    
    const handleSearch = () => {
        if (title !== ""){
            setLoading(true);
            dispatch(productsActions.setFilter({state: "none", category: "none"}))
            if (user.userId) {
                getAllProducts(`/products/getProducts/?title=${title}&notUserId=${user.userId}&sold=false`);
            }else { 
                getAllProducts(`/products/getProducts/?title=${title}&sold=false`);
            }
            navigate("/");
        }
    }

    return (
        <Stack direction = "row" alignItems="center" justifyContent="center" spacing = {1}>
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
            {
                loading ?
                <CircularProgress /> :
                <SearchIcon style = {{width: "30px", cursor: "pointer"}} onClick = {handleSearch} />        
            }
        </Stack>
    )
}

export default SearchBar