import { Response } from "express";
import productModel from "../../models/Product";
import userModel from "../../models/User";

const buyProduct = async (req: any, res: Response) => {
    console.log("buyProduct");
    const productId = req.body;
    console.log("proId: ", productId);
    const email = req.email;
    const product = await productModel.findOne({productId: productId.productId});
    
    if (!product) return res.status(404).send();

    const user = await userModel.findOne({email});

    if (!user) return res.status(404).send();
    // update the status 
    try {
        await product.updateOne({sold: true, buyer: user.userId});
        await user.updateOne({$push: {bought: productId.productId}});

        product.save();
        user.save();

        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

export default buyProduct;