import React, {useState, useRef, ReactSVG} from "react";
import { useParams, NavLink } from "react-router-dom";
import {Stack, Typography, TextField, Button} from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ConvertToBase64 from "../helper/ConvertToBase64";
import DoneIcon from '@mui/icons-material/Done';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAddProductMutation } from "../features/product/productApiSlice";

const SellCategory = () => {
    const submitRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth);
    const {category} = useParams();
    const [addProduct] = useAddProductMutation();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [images, setImages] = useState<any []>([]);
    const [location, setLocation] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [imagesUploaded, setImagesUploaded] = useState<boolean []>([false, false, false, false]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitRef.current){
            submitRef.current.setAttribute("disabled", "");
            submitRef.current.style.opacity = "0.5";
        }
        try {
            const response = await addProduct({title, description, price, location, images, state, category, seller: user.userId}).unwrap();
            setTitle("");
            setDescription("");
            setPrice("");
            setImages([]);
            setState("");
            setLocation("");
            if (submitRef.current){
                submitRef.current.removeAttribute("disabled");
                submitRef.current.style.opacity = "1";
            }
            setImagesUploaded([false, false, false, false]);
            alert("success");
        } catch (err: any) {
            if (submitRef.current){
                submitRef.current.removeAttribute("disabled");
                submitRef.current.style.opacity = "1";
            }
            alert("something went wrong");
        }
    }

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    
    const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }
    
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    }

    const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }

    const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
    }

    const handlefileUpload = async (e: React.ChangeEvent<HTMLInputElement>, which: number) => {
        if (e.target.files){
            const file = e.target.files[0];
            const base64 = await ConvertToBase64(file);
            setImages((prev) => [...images, base64]);
            setImagesUploaded((prev) => {
                let hold = prev;
                hold[which] = true;
                return hold;
            })
        }
    }


    return (
        <Stack direction = "column" alignItems="center" spacing = {2}>
            <h2 style = {{textAlign: "center"}}>Post your Ad</h2>
            <form onSubmit={handleSubmit} style = {{width: "100%", display: "flex", justifyContent: "center"}}>
                <Stack direction = "column" sx = {{width: {xs: "100%", sm: "80%"}, border: {xs: "none", sm: "2px solid black"}}}>
                    {/* category header */}
                    <Stack padding = "25px" style={{borderBottom: "1px solid grey"}}>
                        <h3>Selected Category</h3>
                        <Stack direction = "row" alignItems="center" spacing = {2} sx={{justifyContent: {xs: "space-between", sm: "left"}}}>
                            <Typography fontSize="14px">{category}</Typography>
                            <NavLink to = "/sell" style={{textDecoration: "none"}}>change category</NavLink>
                        </Stack>
                    </Stack>

                    {/* name and description */}
                    <Stack padding = "25px" spacing = {2} style={{borderBottom: "1px solid grey"}}>
                        <h3>Include Some Details</h3>

                        <TextField id="filled-basic" required value = {title} onChange={handleChangeTitle} label="Product Title" variant="filled" sx={{width: {sm: "60%", xs: "100%"}}} />

                        <TextField id="filled-basic" required value = {description} onChange={handleChangeDesc} label="Description" multiline rows = {5} variant="filled" sx={{width: {sm: "60%", xs: "100%"}}} />
                    </Stack>

                    {/* price */}
                    <Stack padding = "25px" spacing = {2} style={{borderBottom: "1px solid grey"}}>
                        <h3>Set A Price</h3>

                        <TextField type="number" required value = {price} onChange={handleChangePrice} id="filled-basic" label="&#8377;" variant="filled" sx={{width: {sm: "60%", xs: "100%"}}} />
                    </Stack>

                    {/* photos */}
                    <Stack padding = "25px" spacing = {2} style={{borderBottom: "1px solid grey"}}>
                        <h3>Upload Up to 4 Images</h3>

                        <Stack direction="row" rowGap = {2} spacing={2} flexWrap="wrap">
                            {
                                imagesUploaded.map((x, i) => {
                                    return (
                                        <label key = {i} htmlFor={i.toString()} style={{cursor: "pointer"}}>
                                            <Stack style={{height: "90px", width: "90px", border: "2px solid black"}} justifyContent="center" alignItems="center">
                                                {
                                                    x ? 
                                                    <DoneIcon />
                                                    :
                                                    <CameraAltIcon  /> 
                                                }
                                            </Stack>
                                            <input type="file" onChange={(e) => {handlefileUpload(e, i)}} id = {i.toString()} style={{display: "none"}}></input>
                                        </label>
                                    )
                                })
                            }
                        </Stack>
                    </Stack>

                    {/* location */}
                    <Stack padding = "25px" spacing = {2} style={{borderBottom: "1px solid grey"}}>
                        <h3>Enter the Location</h3>
                        <TextField type="text" value = {location} onChange = {handleChangeLocation} id="filled-basic" variant="filled" sx={{width: {sm: "60%", xs: "100%"}}} required />
                        <select name="state" value = {state} onChange={handleChangeState} id="state" className="form-control" required>
                            <option value="">select a state</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                    </Stack>    

                    {/* submit button */}
                    <Stack padding = "25px" spacing = {2}>
                        <Button type = "submit" ref = {submitRef} style = {{background: "green", color: "white"}}>let's go</Button>
                    </Stack>    
                </Stack>
            </form>
        </Stack>
    )
}

export default SellCategory