import {useState} from "react";
import { TextField, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [title, setTitle] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
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
            <SearchIcon style = {{width: "30px"}} />        
        </Stack>
    )
}

export default SearchBar