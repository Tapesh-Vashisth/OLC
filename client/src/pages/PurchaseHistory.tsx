import React, {useState, useEffect} from 'react'
import {Stack} from "@mui/material";
import axios from 'axios';
import baseurl from '../api/baseurl';
import { useAppSelector } from '../store/hooks';
import ProductCard from '../components/ProductCard';

const PurchaseHistory = () => {
    const user = useAppSelector((state) => state.auth);
    const [purchases, setPurchases] = useState<any []>([]);

    const getPurchases = async () => {
        if (user.userId) {
            try {   
                const response = await axios.get(baseurl + "/auth/user/getUserPurchases/" + user.userId);
                console.log(response.data);
                setPurchases(response.data);
            } catch (err) {
                alert("something went wrong");
            }
        }
    }

    useEffect(() => {
        getPurchases();
    }, [user])

    return (
        <Stack direction = "column" spacing = {3} justifyContent="center">
            <h1 className='center'>Your Purchases</h1>
            <Stack direction = "column" sx = {{padding: {xs: "0px", sm: "10vw"}}}>
                {
                    purchases.length > 0 ?
                    purchases.map((x, i) => {
                        return (
                          <ProductCard key = {i} category = {x.category} title = {x.title} price = {x.price} image = {x.images.length > 0 ? x.images[0]: null} state = {x.state} sold = {null} />
                        )
                    })
                    :
                    <p className = "center">you have no purchases</p>
                }
            </Stack>
        </Stack>
    )
}

export default PurchaseHistory