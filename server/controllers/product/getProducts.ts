import { Response } from "express";
import productModel from "../../models/Product";

const getProducts = async (req: any, res: Response) => {
    console.log(req.query);
    // const {limit, notUserId, userId, category, state, price} = req.query;
    const {limit, skip} = req.query;
    let query: any = {};

    Object.keys(req.query).forEach(function(key,index) {
        switch (key) {
            case "notUserId":
                query.seller = {$ne: req.query.notUserId};
                break;
            case "userId":
                query.seller = req.query.userId;
                break;
            case "category":
                if (req.query.category !== "all"){
                    query.category = req.query.category;
                }
                break;
            case "state":
                if (req.query.state !== "all"){
                    query.state = req.query.state; 
                }
                break;
            case "sold":
                query.sold = req.query.sold;
                break;
        }
    });

    let products; 
    try {
        if (limit){
            if (skip){
                products = await productModel.find(query, {images: {$slice: 1}}).skip(skip).limit(limit);
            } else {
                products = await productModel.find(query, {images: {$slice: 1}}).limit(limit);
            }
        } else {
            if (skip){
                products = await productModel.find(query, {images: {$slice: 1}}).skip(skip);
            } else {
                products = await productModel.find(query, {images: {$slice: 1}});
            }
        }

        console.log(query)

        // if (req.query.notUserId) {
        //     products = await productModel.find(query, {images: {$slice: 1}}).limit(req.query.limit);
        // } else if (req.query.userId) {
        //     products = await productModel.find(query, {images: {$slice: 1}});
        // } else {
        //     products = await productModel.find(query, {images: {$slice: 1}});
        // }

        res.status(200).json(products);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send();
    }
}

export default getProducts;