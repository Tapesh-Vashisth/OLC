import { Response } from "express";
import productModel from "../../models/Product";

const getUserProducts = async (req: any, res: Response) => {
    console.log("get user products");
    const userId = req.params.userId;

    const product = await productModel.find({seller: userId}, {images: {$slice: 1}}).select("category price title images state sold");

    if (!product) return res.status(404).send();

    return res.status(200).json(product);
}

export default getUserProducts;