import { Response } from "express";
import productModel from "../../models/Product";
import userModel from "../../models/User";

const getProduct = async (req: any, res: Response) => {
    console.log("getProduct");
    const productId = req.params.productId;
    // get product 
    const product = await productModel.findOne({productId});

    if (!product) return res.status(404).send();

    // get the seller 
    const seller = await userModel.findOne({seller: product.seller});

    if (!seller) return res.status(404).send();

    return res.status(200).json({product, seller : {name: seller.name, profileImage: seller.profileImage, email: seller.email}});
};

export default getProduct;