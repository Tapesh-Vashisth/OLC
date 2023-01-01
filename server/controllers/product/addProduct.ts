import { Response } from "express";
import productModel from "../../models/Product";
import userModel from "../../models/User";
const { v4: uuidv4 } = require('uuid');

const addProduct = async (req: any, res: Response) => {
    console.log(addProduct);
    if (req.email){
        const data = {...req.body, productId: uuidv4()};
        const user = await userModel.findOne({email: req.email});
        if (!user) return res.sendStatus(404);

        try {
            await user.updateOne({$push: {products: data.productId}});
            await user.save();

            const product = new productModel(data);
            await product.save();
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }
}

export default addProduct;