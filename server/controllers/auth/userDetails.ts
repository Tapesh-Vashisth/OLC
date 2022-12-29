import { Response } from "express";
import userModel from "../../models/User";

const userDetails = async (req: any, res: Response) => {
    console.log("userDetails");
    const user = await userModel.findOne({email: req.email});

    if (!user) return res.sendStatus(404);

    res.status(200).json({name: user.name, email: user.email});
}

export default userDetails;