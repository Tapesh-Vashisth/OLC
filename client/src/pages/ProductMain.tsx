import React, {useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Stack, Button } from "@mui/material";
import baseurl from '../api/baseurl';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';
import { useBuyProductMutation } from '../features/product/productApiSlice';
import { productsActions } from '../features/product/productsSlice';

const ProductMain = () => {
    const dispatch = useAppDispatch();
    const [buyProduct] = useBuyProductMutation();
    const buyRef = useRef<HTMLButtonElement>(null);
    const user = useAppSelector((state) => state.auth);
    const {productId} = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState<any>(null);

    const getDetails = async () => {
        try {
            const response = await axios.get(baseurl + "/products/getProduct/" + productId);
            setProductData(response.data);
        } catch (err) {
            alert("something went wrong!");
        }
    }

    const BuyHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
        if (buyRef.current){
            buyRef.current.setAttribute("disabled", "");
            buyRef.current.style.opacity = "0.5";
        }
        if (user.userId) {
            try {
                const response = await buyProduct({productId}).unwrap();
                dispatch(productsActions.removeProduct(productId));
                navigate("/");
            } catch (err: any) {
                alert("something went wrong");
            }
        } else {
            navigate("/login");
        }
        if (buyRef.current){
            buyRef.current.removeAttribute("disabled");
            buyRef.current.style.opacity = "1";
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <>
            {
                productData ?        
                <Grid container columns = {12}>
                    <Grid item xs = {12} md = {9}>
                        <Stack direction="column" spacing = {2} padding = {3}>
                            {/* images  */}
                            <div style = {{background: "black", padding: "20px 0px", borderBottom: "1px solid grey"}}>
                                <CarouselProvider
                                    naturalSlideWidth={1}
                                    naturalSlideHeight={1}
                                    dragEnabled={true}
                                    touchEnabled={true}
                                    infinite = {true}
                                    totalSlides={productData.product.images.length}
                                >
                                    <Slider style = {{width: "100%", height: "350px"}}>
                                    {
                                        productData.product.images.map((x: any, i: any) => {
                                            return (
                                                <Slide key = {i} index={i} style = {{textAlign: "center"}}>
                                                    <img src = {x} style = {{maxWidth: "100%", height: "350px"}} />
                                                </Slide>
                                            )
                                        }) 
                                    } 
                                    </Slider>
                                    <DotGroup style = {{marginTop: "10px", display: "flex", flexDirection: "row", justifyContent:"center", columnGap:"5px"}} />
                                </CarouselProvider>
                            </div>
                            {/* price and title  */}
                            <Stack direction="column" padding = {2} style = {{borderBottom: "1px solid grey"}}>
                                <h1>&#8377; {productData.product.price}</h1>
                                <h4>{productData.product.title}</h4>
                            </Stack>
                            {/* description  */}
                            <Stack direction="column" padding = {2} style = {{borderBottom: "1px solid grey"}}>
                                <h2 style = {{fontWeight: "bold"}}>Description</h2>
                                <p>
                                    {productData.product.description}
                                    {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error mollitia id suscipit nesciunt labore nemo sint, quidem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam earum explicabo reprehenderit quia, odit illo soluta inventore aliquam nobis id eligendi quibusdam porro dicta ullam nesciunt ad molestias fugiat a eaque! Delectus facilis voluptates voluptate repellendus praesentium? Iure at beatae sit suscipit voluptatum! omnis illo ratione vel, soluta optio libero deserunt natus sed atque enim! Fuga perferendis pariatur facere explicabo. */}
                                </p>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs = {12} md = {3} padding={2}>
                        {/* seller description */}
                        <Stack direction = "column" spacing = {2} padding = {2} style = {{borderBottom: "1px solid grey"}}> 
                            <h2 style = {{fontWeight: "bold"}}>Seller</h2>
                            <Stack direction = "row" spacing={2}>
                                {
                                    productData.seller.profileImage ? 
                                    <img src = {productData.seller.profileImage} style = {{width: "90px", height: "90px", borderRadius: "100%"}}></img>
                                    :
                                    <div style = {{width: "90px", height: "90px", borderRadius: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: 'gray'}}>no image</div>
                                }
                                <Stack>
                                    <h3>{productData.seller.name}</h3>
                                    <p>{productData.seller.email}</p>
                                </Stack>
                            </Stack>
                        </Stack>
                        {/* location  */}
                        <Stack direction= "column" spacing = {3} padding = {2} style = {{borderBottom: "1px solid grey"}}>
                            <h3 style = {{fontWeight: "bold"}}>Location</h3>
                            <Stack direction="column">
                                <p>{productData.product.location}</p    >
                                <p>{productData.product.state}</p>
                            </Stack>
                        </Stack>
                        {/* buy button  */}
                        <Stack direction= "column" spacing = {3} padding = {2}>
                            <Button ref = {buyRef} style = {{background: "lightGreen"}} onClick = {BuyHandler}>
                                Buy Now
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                : 
                null
            }
        </>

    )
}

export default ProductMain