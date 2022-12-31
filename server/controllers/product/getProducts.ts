import { Response } from "express";
import productModel from "../../models/Product";

const getProducts = async (req: any, res: Response) => {
    console.log(req.query);
    let products; 
    try {
        if (req.query.notUserId) {
            products = await productModel.find({seller: {$ne: req.query.notUserId}, sold: false}, {images: {$slice: 1}});
        } else if (req.query.userId) {
            products = await productModel.find({seller: req.query.userId, sold: false}, {images: {$slice: 1}});
        } else {
            products = await productModel.find({sold: false}, {images: {$slice: 1}});
        }

        res.status(200).json(products);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send();
    }
}

export default getProducts;